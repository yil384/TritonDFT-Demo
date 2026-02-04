#!/usr/bin/env python3
"""
Generate sample placeholder images for the TritonDFT website.
This script creates example charts and diagrams.

Requirements:
    pip install matplotlib numpy
"""

import matplotlib.pyplot as plt
import numpy as np
import os

# Create assets directory if it doesn't exist
os.makedirs('assets', exist_ok=True)

# Set style
plt.style.use('seaborn-v0_8-darkgrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial', 'DejaVu Sans']

# 1. Performance Comparison Chart
def create_performance_comparison():
    methods = ['Manual\nWorkflow', 'Atomate', 'GPT-4o', 'TritonDFT']
    tasks = ['Structural\nOptimization', 'Band\nStructure', 'Phonon\nCalculation', 'Adsorption\nEnergy']
    
    data = {
        'Manual Workflow': [82.3, 75.6, 68.4, 71.2],
        'Atomate': [78.5, 72.1, 64.8, 68.3],
        'GPT-4o': [71.2, 68.9, 58.7, 63.4],
        'TritonDFT': [91.7, 88.3, 84.2, 86.5]
    }
    
    x = np.arange(len(tasks))
    width = 0.2
    
    fig, ax = plt.subplots(figsize=(14, 6))
    colors = ['#95a5a6', '#3498db', '#e74c3c', '#2ecc71']
    
    for i, (method, values) in enumerate(data.items()):
        offset = (i - 1.5) * width
        bars = ax.bar(x + offset, values, width, label=method, color=colors[i], alpha=0.8)
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 1,
                   f'{height:.1f}%',
                   ha='center', va='bottom', fontsize=9)
    
    ax.set_xlabel('Tasks', fontsize=14, fontweight='bold')
    ax.set_ylabel('Accuracy (%)', fontsize=14, fontweight='bold')
    ax.set_title('Performance Comparison Across Diverse DFT Tasks', fontsize=16, fontweight='bold', pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(tasks, fontsize=11)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.9)
    ax.set_ylim(0, 105)
    ax.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('assets/performance-comparison.png', dpi=300, bbox_inches='tight', facecolor='white')
    print("✓ Created: assets/performance-comparison.png")
    plt.close()

# 2. Time Comparison Chart
def create_time_comparison():
    steps = ['Structure\nSearch', 'Parameter\nConfiguration', 'Script\nGeneration', 
             'Job\nExecution', 'Result\nAnalysis']
    manual_time = [45, 120, 60, 30, 90]  # minutes
    tritondft_time = [2, 8, 3, 5, 10]    # minutes
    
    fig, ax = plt.subplots(figsize=(12, 6))
    
    y = np.arange(len(steps))
    height = 0.35
    
    bars1 = ax.barh(y - height/2, manual_time, height, label='Manual Workflow', color='#e74c3c', alpha=0.8)
    bars2 = ax.barh(y + height/2, tritondft_time, height, label='TritonDFT (Automated)', color='#2ecc71', alpha=0.8)
    
    # Add value labels
    for bars in [bars1, bars2]:
        for bar in bars:
            width = bar.get_width()
            ax.text(width + 5, bar.get_y() + bar.get_height()/2,
                   f'{int(width)} min',
                   ha='left', va='center', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Time (minutes)', fontsize=14, fontweight='bold')
    ax.set_ylabel('Workflow Steps', fontsize=14, fontweight='bold')
    ax.set_title('DFT Workflow Time Comparison: Manual vs. TritonDFT', fontsize=16, fontweight='bold', pad=20)
    ax.set_yticks(y)
    ax.set_yticklabels(steps, fontsize=11)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.9)
    ax.set_xlim(0, max(manual_time) + 30)
    ax.grid(True, alpha=0.3, axis='x')
    
    plt.tight_layout()
    plt.savefig('assets/time-comparison.png', dpi=300, bbox_inches='tight', facecolor='white')
    print("✓ Created: assets/time-comparison.png")
    plt.close()

# 3. Pareto Frontier Chart
def create_pareto_frontier():
    np.random.seed(42)
    
    # Generate random configurations
    n_points = 50
    cpu_time = np.random.exponential(20, n_points) + 5
    energy_deviation = 100 / cpu_time + np.random.normal(0, 0.5, n_points)
    energy_deviation = np.abs(energy_deviation)
    
    # Pareto frontier points (manually selected)
    pareto_cpu = [8, 15, 25, 40, 60]
    pareto_energy = [12, 7, 4, 2, 1]
    
    # TritonDFT selected point
    selected_cpu = 25
    selected_energy = 4
    
    fig, ax = plt.subplots(figsize=(10, 7))
    
    # Plot all configurations
    ax.scatter(cpu_time, energy_deviation, alpha=0.4, s=60, color='#95a5a6', label='Possible Configurations')
    
    # Plot Pareto frontier
    ax.plot(pareto_cpu, pareto_energy, 'r--', linewidth=2.5, label='Pareto Frontier', zorder=5)
    ax.scatter(pareto_cpu, pareto_energy, s=100, color='#e74c3c', zorder=6, edgecolors='darkred', linewidth=2)
    
    # Plot TritonDFT selected point
    ax.scatter([selected_cpu], [selected_energy], s=300, color='#2ecc71', marker='*', 
              label='TritonDFT Selected', zorder=7, edgecolors='darkgreen', linewidth=2)
    
    ax.set_xlabel('Computational Cost (CPU hours)', fontsize=14, fontweight='bold')
    ax.set_ylabel('Energy Deviation (meV/atom)', fontsize=14, fontweight='bold')
    ax.set_title('Energy Deviation vs. Computational Cost for Silicon (Fd-3m)', 
                fontsize=16, fontweight='bold', pad=20)
    ax.legend(loc='upper right', fontsize=11, framealpha=0.9)
    ax.grid(True, alpha=0.3)
    ax.set_xlim(0, max(cpu_time) + 10)
    ax.set_ylim(0, max(energy_deviation) + 2)
    
    # Add annotation
    ax.annotate('Optimal Trade-off', 
               xy=(selected_cpu, selected_energy), 
               xytext=(selected_cpu + 15, selected_energy + 5),
               arrowprops=dict(arrowstyle='->', color='black', lw=2),
               fontsize=11, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('assets/pareto-frontier.png', dpi=300, bbox_inches='tight', facecolor='white')
    print("✓ Created: assets/pareto-frontier.png")
    plt.close()

# 4. Workflow Diagram (Text-based placeholder)
def create_workflow_diagram():
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(5, 9.5, 'TritonDFT Multi-Agent System Architecture', 
           ha='center', fontsize=18, fontweight='bold')
    
    # Agent boxes
    agents = [
        ('Planner Agent', 1.5, 6.5, '#3498db'),
        ('Executor Agent', 5, 6.5, '#e74c3c'),
        ('Analyzer Agent', 8.5, 6.5, '#2ecc71'),
        ('Refiner Agent', 5, 3.5, '#f39c12')
    ]
    
    for name, x, y, color in agents:
        # Draw box
        rect = plt.Rectangle((x-0.8, y-0.4), 1.6, 0.8, 
                            facecolor=color, edgecolor='black', linewidth=2, alpha=0.7)
        ax.add_patch(rect)
        ax.text(x, y, name, ha='center', va='center', 
               fontsize=12, fontweight='bold', color='white')
    
    # Knowledge Base
    rect = plt.Rectangle((4, 1), 2, 0.8, 
                        facecolor='#95a5a6', edgecolor='black', linewidth=2, alpha=0.7)
    ax.add_patch(rect)
    ax.text(5, 1.4, 'Knowledge Base', ha='center', va='center', 
           fontsize=12, fontweight='bold', color='white')
    
    # Arrows (simplified)
    arrow_props = dict(arrowstyle='->', lw=2, color='black')
    ax.annotate('', xy=(4.2, 6.5), xytext=(2.3, 6.5), arrowprops=arrow_props)
    ax.annotate('', xy=(7.7, 6.5), xytext=(5.8, 6.5), arrowprops=arrow_props)
    ax.annotate('', xy=(5, 4.3), xytext=(5, 5.7), arrowprops=arrow_props)
    ax.annotate('', xy=(5, 1.8), xytext=(5, 2.7), arrowprops=arrow_props)
    
    # Labels
    ax.text(5, 8.5, 'Input: User Query + Material', ha='center', fontsize=11, 
           bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))
    ax.text(5, 0.2, 'Output: DFT Results + Analysis', ha='center', fontsize=11,
           bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.5))
    
    plt.tight_layout()
    plt.savefig('assets/workflow-diagram.png', dpi=300, bbox_inches='tight', facecolor='white')
    print("✓ Created: assets/workflow-diagram.png")
    plt.close()

# Main execution
if __name__ == '__main__':
    print("Generating sample images for TritonDFT website...")
    print()
    
    try:
        create_performance_comparison()
        create_time_comparison()
        create_pareto_frontier()
        create_workflow_diagram()
        
        print()
        print("=" * 60)
        print("✓ All images generated successfully!")
        print("=" * 60)
        print()
        print("Images created in the 'assets/' folder:")
        print("  - performance-comparison.png")
        print("  - time-comparison.png")
        print("  - pareto-frontier.png")
        print("  - workflow-diagram.png")
        print()
        print("You can now view your website with these images.")
        print("Run: ./start.sh or python3 -m http.server 8000")
        
    except Exception as e:
        print(f"Error generating images: {e}")
        print("Make sure you have matplotlib and numpy installed:")
        print("  pip install matplotlib numpy")

