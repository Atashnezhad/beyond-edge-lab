from dataclasses import dataclass
from typing import Optional

@dataclass
class ModelConfig:
    input_dim: int = 3
    hidden_dim: int = 64
    output_dim: int = 1
    num_layers: int = 3
    dropout: float = 0.2

@dataclass
class TrainingConfig:
    learning_rate: float = 0.001
    weight_decay: float = 5e-4
    num_epochs: int = 200
    early_stopping_patience: int = 20
    batch_size: int = 32
    device: str = "cuda"  # or "cpu"

@dataclass
class DataConfig:
    train_ratio: float = 0.7
    val_ratio: float = 0.15
    test_ratio: float = 0.15
    random_seed: int = 42

@dataclass
class Config:
    model: ModelConfig = ModelConfig()
    training: TrainingConfig = TrainingConfig()
    data: DataConfig = DataConfig()
    log_dir: str = "logs"
    model_save_dir: str = "models"
    results_dir: str = "results" 