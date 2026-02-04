# Assets Folder

This folder contains images and other resources for the TritonDFT website.

## Required Images

Please add the following images to this folder:

### 1. performance-comparison.png
**Purpose**: Overall performance comparison across different DFT tasks

**Suggested Content**:
- Bar chart or grouped comparison chart
- Shows TritonDFT vs. baselines (Manual Workflow, Atomate, GPT-4o, etc.)
- Tasks: Structural Optimization, Band Structure, Phonon Calculation, Adsorption
- Highlights accuracy improvements

**Recommended Size**: 1000x400 pixels or higher (wide aspect ratio)

### 2. time-comparison.png
**Purpose**: Comparison of time required for each workflow step

**Suggested Content**:
- Horizontal bar chart or comparison diagram
- Shows manual time vs. TritonDFT automated time
- Steps: Structure search, parameter configuration, script generation, execution, analysis
- Time units: minutes to hours

**Recommended Size**: 800x500 pixels or higher

### 3. pareto-frontier.png
**Purpose**: Energy deviation vs. computational cost for Silicon

**Suggested Content**:
- Scatter plot or line chart
- X-axis: Computational cost (CPU time or core-hours)
- Y-axis: Energy deviation (eV or relative error)
- Pareto frontier highlighted
- Different DFT parameter configurations as points
- TritonDFT selected configurations marked

**Recommended Size**: 600x500 pixels or higher

### 4. workflow-diagram.png
**Purpose**: TritonDFT system architecture and workflow

**Suggested Content**:
- System architecture diagram
- Four agents: Planner, Executor, Analyzer, Refiner
- Plan-Execute-Refine loop visualization
- Knowledge base and tool integration
- Input/output relationships

**Recommended Size**: 900x600 pixels or higher

## Temporary Placeholders

Currently, the website uses CSS-generated gradient placeholders. Once you upload the actual images, they will automatically be displayed.

## Image Format Recommendations

- **Format**: PNG (supports transparency) or JPG
- **Optimization**: Use image compression tools to reduce file size
- **Resolution**: At least 2x for high-DPI displays
- **Color**: RGB color mode
- **Background**: White or transparent for diagrams

## Upload Instructions

1. Copy image files to this folder
2. Ensure file names match exactly (case-sensitive)
3. Refresh the website to see the images

## Creating Figures

If you don't have ready-made images, you can use:

- **Matplotlib/Python**: Generate data visualization charts
- **Figma/Sketch**: Design workflow diagrams
- **Inkscape**: Create vector graphics
- **PowerPoint/Keynote**: Quick diagram creation
- **Graphviz**: Automated diagram generation
- **draw.io**: Free online diagram tool

## Example Python Code for Charts

```python
import matplotlib.pyplot as plt
import numpy as np

# Performance comparison
methods = ['Manual', 'Atomate', 'GPT-4o', 'TritonDFT']
tasks = ['Struct. Opt.', 'Band Str.', 'Phonon', 'Adsorption']
data = {
    'Manual': [82.3, 75.6, 68.4, 71.2],
    'Atomate': [78.5, 72.1, 64.8, 68.3],
    'GPT-4o': [71.2, 68.9, 58.7, 63.4],
    'TritonDFT': [91.7, 88.3, 84.2, 86.5]
}

x = np.arange(len(tasks))
width = 0.2

fig, ax = plt.subplots(figsize=(12, 6))
for i, method in enumerate(methods):
    ax.bar(x + i*width, data[method], width, label=method)

ax.set_xlabel('Tasks')
ax.set_ylabel('Accuracy (%)')
ax.set_title('Performance Comparison Across DFT Tasks')
ax.set_xticks(x + width * 1.5)
ax.set_xticklabels(tasks)
ax.legend()
plt.tight_layout()
plt.savefig('performance-comparison.png', dpi=300, bbox_inches='tight')
```

## Additional Resources

You can also add:
- Logo files
- Favicon (website icon)
- Demo video thumbnails
- Team member photos (if needed after deanonymization)
- Supplementary material figures

---

**Tip**: For academic figures, maintain consistency in:
- Font sizes (readable at different scales)
- Color schemes (colorblind-friendly)
- Line weights
- Axis labels and units
