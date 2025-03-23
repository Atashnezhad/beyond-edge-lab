import torch
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from torch_geometric.loader import DataLoader
from typing import Dict, List, Tuple
import os

from model import GCNModel
from config import Config

class Evaluator:
    def __init__(self, config: Config):
        self.config = config
        self.device = torch.device(config.training.device)
        
    def evaluate(self, model: GCNModel, test_loader: DataLoader) -> Dict:
        model.eval()
        all_preds = []
        all_targets = []
        total_loss = 0
        
        with torch.no_grad():
            for batch in test_loader:
                batch = batch.to(self.device)
                out = model(batch.x, batch.edge_index, batch.batch)
                
                all_preds.extend(out.cpu().numpy())
                all_targets.extend(batch.y.cpu().numpy())
                
                loss = torch.nn.MSELoss()(out, batch.y)
                total_loss += loss.item()
        
        all_preds = np.array(all_preds)
        all_targets = np.array(all_targets)
        
        metrics = {
            'mse': total_loss / len(test_loader),
            'mae': np.mean(np.abs(all_preds - all_targets)),
            'rmse': np.sqrt(np.mean((all_preds - all_targets) ** 2)),
            'r2': 1 - np.sum((all_preds - all_targets) ** 2) / np.sum((all_targets - np.mean(all_targets)) ** 2)
        }
        
        return metrics, all_preds, all_targets
    
    def plot_results(self, history: Dict, metrics: Dict, 
                    predictions: np.ndarray, targets: np.ndarray):
        # Create results directory if it doesn't exist
        os.makedirs(self.config.results_dir, exist_ok=True)
        
        # Plot training history
        plt.figure(figsize=(12, 4))
        plt.subplot(1, 2, 1)
        plt.plot(history['train_loss'], label='Train Loss')
        plt.plot(history['val_loss'], label='Validation Loss')
        plt.title('Training History')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
        
        # Plot predictions vs targets
        plt.subplot(1, 2, 2)
        plt.scatter(targets, predictions, alpha=0.5)
        plt.plot([targets.min(), targets.max()], [targets.min(), targets.max()], 'r--')
        plt.title('Predictions vs Targets')
        plt.xlabel('Target Values')
        plt.ylabel('Predicted Values')
        
        plt.tight_layout()
        plt.savefig(os.path.join(self.config.results_dir, 'training_results.png'))
        plt.close()
        
        # Plot error distribution
        plt.figure(figsize=(10, 6))
        errors = predictions - targets
        sns.histplot(errors, kde=True)
        plt.title('Error Distribution')
        plt.xlabel('Prediction Error')
        plt.ylabel('Count')
        plt.savefig(os.path.join(self.config.results_dir, 'error_distribution.png'))
        plt.close()
        
        # Save metrics to file
        with open(os.path.join(self.config.results_dir, 'metrics.txt'), 'w') as f:
            for metric, value in metrics.items():
                f.write(f"{metric}: {value:.4f}\n") 