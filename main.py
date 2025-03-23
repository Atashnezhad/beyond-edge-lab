import torch
import numpy as np
from torch_geometric.loader import DataLoader
from torch_geometric.datasets import TUDataset
from sklearn.model_selection import train_test_split
import random
import os

from model import create_model
from config import Config
from trainer import Trainer
from evaluator import Evaluator

def set_seed(seed):
    """Set random seed for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)
        torch.backends.cudnn.deterministic = True
        torch.backends.cudnn.benchmark = False

def split_dataset(dataset, train_ratio, val_ratio, test_ratio, random_state):
    """Split dataset into train, validation, and test sets."""
    # First split: train+val and test
    train_val_size = int(len(dataset) * (train_ratio + val_ratio))
    test_size = len(dataset) - train_val_size
    train_val_dataset, test_dataset = train_test_split(
        dataset, test_size=test_size, random_state=random_state
    )
    
    # Second split: train and val
    train_size = int(len(train_val_dataset) * (train_ratio / (train_ratio + val_ratio)))
    val_size = len(train_val_dataset) - train_size
    train_dataset, val_dataset = train_test_split(
        train_val_dataset, test_size=val_size, random_state=random_state
    )
    
    return train_dataset, val_dataset, test_dataset

def main():
    # Load configuration
    config = Config()
    
    # Set random seed for reproducibility
    set_seed(config.data.random_seed)
    
    # Load dataset
    dataset = TUDataset(root='data/TUDataset', name='MUTAG')
    
    # Split dataset
    train_dataset, val_dataset, test_dataset = split_dataset(
        dataset,
        config.data.train_ratio,
        config.data.val_ratio,
        config.data.test_ratio,
        config.data.random_seed
    )
    
    # Create data loaders
    train_loader = DataLoader(train_dataset, batch_size=config.training.batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=config.training.batch_size)
    test_loader = DataLoader(test_dataset, batch_size=config.training.batch_size)
    
    # Create model
    model = create_model(
        input_dim=dataset.num_features,
        hidden_dim=config.model.hidden_dim,
        output_dim=dataset.num_classes,
        num_layers=config.model.num_layers,
        dropout=config.model.dropout
    ).to(config.training.device)
    
    # Initialize trainer and evaluator
    trainer = Trainer(config)
    evaluator = Evaluator(config)
    
    # Train model
    print("Starting training...")
    history = trainer.train(model, train_loader, val_loader)
    
    # Evaluate model
    print("\nEvaluating model...")
    metrics, predictions, targets = evaluator.evaluate(model, test_loader)
    
    # Print metrics
    print("\nTest Metrics:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.4f}")
    
    # Plot results
    print("\nGenerating plots...")
    evaluator.plot_results(history, metrics, predictions, targets)
    print(f"Results saved in {config.results_dir}")

if __name__ == "__main__":
    main() 