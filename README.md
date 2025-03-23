# Graph Neural Network Training Framework

A modular and extensible framework for training Graph Neural Networks (GNNs) using PyTorch and PyTorch Geometric.

## Project Structure

```
.
├── config.py          # Configuration management
├── model.py          # GNN model architecture
├── trainer.py        # Training logic
├── evaluator.py      # Evaluation and visualization
├── main.py          # Main execution script
├── requirements.txt  # Project dependencies
└── README.md        # This file
```

## Features

- Modular architecture with separate components for model, training, and evaluation
- Configurable hyperparameters using dataclasses
- TensorBoard integration for training monitoring
- Early stopping implementation
- Comprehensive evaluation metrics
- Visualization of training results and error distributions
- Reproducible training with fixed random seeds

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Configure your model and training parameters in `config.py`
2. Run the training script:
```bash
python main.py
```

The script will:
- Load and preprocess the dataset
- Train the model with the specified configuration
- Save the best model based on validation loss
- Generate evaluation metrics and visualizations
- Save results in the `results` directory

## Output

The training process generates:
- Model checkpoints in the `models` directory
- Training logs in the `logs` directory
- Evaluation results and visualizations in the `results` directory

## Customization

You can customize the framework by:
1. Modifying the model architecture in `model.py`
2. Adjusting training parameters in `config.py`
3. Adding new evaluation metrics in `evaluator.py`
4. Implementing custom data loading in `main.py`
