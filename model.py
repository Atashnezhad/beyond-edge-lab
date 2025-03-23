import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, global_mean_pool
from torch_geometric.data import Data

class GCNModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, num_layers=3, dropout=0.2):
        super(GCNModel, self).__init__()
        self.num_layers = num_layers
        
        # Input layer
        self.conv1 = GCNConv(input_dim, hidden_dim, dropout=dropout)
        
        # Hidden layers
        self.conv_layers = nn.ModuleList([
            GCNConv(hidden_dim, hidden_dim, dropout=dropout)
            for _ in range(num_layers - 2)
        ])
        
        # Output layer
        self.conv_out = GCNConv(hidden_dim, output_dim, dropout=dropout)
        
        # Dropout
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x, edge_index, batch=None):
        # Input layer
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.dropout(x)
        
        # Hidden layers
        for conv in self.conv_layers:
            x = conv(x, edge_index)
            x = F.relu(x)
            x = self.dropout(x)
        
        # Output layer
        x = self.conv_out(x, edge_index)
        
        # Global pooling if batch is provided
        if batch is not None:
            x = global_mean_pool(x, batch)
            
        return x

def create_model(input_dim, hidden_dim, output_dim, num_layers=3, dropout=0.2):
    """Factory function to create a GCN model with specified parameters."""
    return GCNModel(
        input_dim=input_dim,
        hidden_dim=hidden_dim,
        output_dim=output_dim,
        num_layers=num_layers,
        dropout=dropout
    ) 