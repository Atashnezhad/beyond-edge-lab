import torch
import torch.nn as nn
import torch.optim as optim
from torch_geometric.loader import DataLoader
from torch.utils.tensorboard import SummaryWriter
import os
from tqdm import tqdm
import numpy as np
from typing import Dict, List, Tuple

from model import GCNModel
from config import Config

class Trainer:
    def __init__(self, config: Config):
        self.config = config
        self.device = torch.device(config.training.device)
        self.writer = SummaryWriter(config.log_dir)
        
        # Create directories
        os.makedirs(config.log_dir, exist_ok=True)
        os.makedirs(config.model_save_dir, exist_ok=True)
        os.makedirs(config.results_dir, exist_ok=True)
        
    def train_epoch(self, model: GCNModel, train_loader: DataLoader, 
                    criterion: nn.Module, optimizer: optim.Optimizer) -> float:
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            batch = batch.to(self.device)
            optimizer.zero_grad()
            
            out = model(batch.x, batch.edge_index, batch.batch)
            loss = criterion(out, batch.y)
            
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
            
        return total_loss / len(train_loader)
    
    def validate(self, model: GCNModel, val_loader: DataLoader, 
                criterion: nn.Module) -> Tuple[float, float]:
        model.eval()
        total_loss = 0
        total_mae = 0
        
        with torch.no_grad():
            for batch in val_loader:
                batch = batch.to(self.device)
                out = model(batch.x, batch.edge_index, batch.batch)
                
                loss = criterion(out, batch.y)
                mae = torch.mean(torch.abs(out - batch.y))
                
                total_loss += loss.item()
                total_mae += mae.item()
        
        return total_loss / len(val_loader), total_mae / len(val_loader)
    
    def train(self, model: GCNModel, train_loader: DataLoader, val_loader: DataLoader) -> Dict:
        criterion = nn.MSELoss()
        optimizer = optim.Adam(model.parameters(), 
                             lr=self.config.training.learning_rate,
                             weight_decay=self.config.training.weight_decay)
        
        best_val_loss = float('inf')
        patience_counter = 0
        history = {
            'train_loss': [], 'val_loss': [], 'val_mae': []
        }
        
        for epoch in tqdm(range(self.config.training.num_epochs)):
            # Training
            train_loss = self.train_epoch(model, train_loader, criterion, optimizer)
            
            # Validation
            val_loss, val_mae = self.validate(model, val_loader, criterion)
            
            # Log metrics
            self.writer.add_scalar('Loss/train', train_loss, epoch)
            self.writer.add_scalar('Loss/val', val_loss, epoch)
            self.writer.add_scalar('MAE/val', val_mae, epoch)
            
            # Update history
            history['train_loss'].append(train_loss)
            history['val_loss'].append(val_loss)
            history['val_mae'].append(val_mae)
            
            # Early stopping
            if val_loss < best_val_loss:
                best_val_loss = val_loss
                patience_counter = 0
                self.save_model(model, epoch, val_loss)
            else:
                patience_counter += 1
                if patience_counter >= self.config.training.early_stopping_patience:
                    print(f"Early stopping triggered after {epoch + 1} epochs")
                    break
        
        self.writer.close()
        return history
    
    def save_model(self, model: GCNModel, epoch: int, val_loss: float):
        path = os.path.join(self.config.model_save_dir, 
                          f"model_epoch_{epoch}_val_loss_{val_loss:.4f}.pt")
        torch.save(model.state_dict(), path) 