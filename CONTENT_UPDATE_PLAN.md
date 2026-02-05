# 网站内容更新计划

## 基于论文的内容修复

### 需要更新的部分

#### 1. Performance Chart (Hero Section)
- 当前状态：占位符图片
- 需要添加：`pic/intro4.pdf` 或 `pic/radar.pdf`
- 描述：性能对比雷达图，展示 TritonDFT 在不同材料类型上的表现

#### 2. Introduction Figure  
- 当前状态：占位符
- 需要添加：`pic/intro4.pdf` - DFT 工作流程时间对比
- 描述：Figure 1 from paper - 展示手动vs自动化的时间对比

#### 3. Pareto Frontier Figure
- 当前状态：占位符
- 需要添加：`pic/cost_vs_accuracy_three_models_si.pdf`
- 描述：Figure 2 from paper - 硅材料的能量偏差与计算成本关系

#### 4. Workflow Diagram
- 当前状态：占位符
- 需要添加：`pic/overview3.pdf`
- 描述：TritonDFT 系统架构图

#### 5. Results Section - Tables
需要添加以下表格：

**Table 1: Framework Comparison** (从 `tab/comparasion_table.tex`)
- 对比 TritonDFT vs DREAMS vs VASPilot vs AgenticDFT
- 列：框架架构、评估数据集、指标

**Table 2: Parameter Configuration Performance** (从 `tab/accuracy_table.tex`)
- 不同 LLM 在不同误差阈值下的表现
- 包含 Pass Rate 和 Cost Factor

**Table 3: Mean Absolute Error** (从 `tab/e2e_table.tex`)
- 不同 DFT 任务的平均绝对误差
- 任务：VC-relax, SCF, Band Gap, DOS

**Table 4: Cost Analysis** (从 `tab/cost_table.tex`)
- API 使用成本
- 不同任务和模型的成本对比

**Table 5: Parallel Efficiency** (从 `tab/parallel_table.tex`)
- 不同 CPU 核心数下的加速比
- 16、32、64 核心

#### 6. Additional Figures
- `pic/phono.pdf` - 声子计算示例
- `pic/throughput_wo_dft_comparison.pdf` - 吞吐量对比
- `pic/dft_k8_tradeoff_analysis.pdf` - K点与计算成本权衡分析

### 更新优先级

#### 高优先级（必须）
1. ✅ Results Section - 添加真实表格数据
2. ✅ Framework Comparison Table
3. ✅ Parameter Configuration Table  
4. ✅ 添加图片到 assets 文件夹

#### 中优先级（重要）
5. ⏳ Pareto Frontier 图片
6. ⏳ Introduction 时间对比图
7. ⏳ MAE 表格
8. ⏳ Cost 表格

#### 低优先级（可选）
9. ⏳ Parallel Efficiency 表格
10. ⏳ 其他补充图表

### 实施步骤

#### 步骤 1: 复制 PDF 文件
```bash
# 将 PDF 转换为 PNG（如需要）
# 或直接使用 PDF
cp pic/*.pdf assets/
```

#### 步骤 2: 更新 HTML
- 更新 Results section 添加真实表格
- 更新图片路径指向实际文件
- 确保所有数据与论文一致

#### 步骤 3: 添加 CSS 样式
- 表格样式（多行表头）
- 高亮行样式
- 响应式表格

#### 步骤 4: 验证
- 检查所有表格数据正确
- 确保图片正常显示
- 测试响应式布局

### 数据来源映射

| 网站内容 | 论文来源 | 文件 |
|---------|---------|------|
| Framework Comparison | Table (comparison) | tab/comparasion_table.tex |
| Parameter Config | Table (accuracy) | tab/accuracy_table.tex |
| MAE Results | Table | tab/e2e_table.tex |
| Cost Analysis | Table | tab/cost_table.tex |
| Parallel Speedup | Table | tab/parallel_table.tex |
| Intro Figure | Figure 1 | pic/intro4.pdf |
| Pareto Figure | Figure 2 | pic/cost_vs_accuracy_three_models_si.pdf |
| System Overview | Figure | pic/overview3.pdf |
| Radar Chart | Figure | pic/radar.pdf |

### 注意事项

1. **保持学术风格**：表格样式应该专业、清晰
2. **数据准确性**：所有数值必须与论文完全一致
3. **图片质量**：PDF 转换为 PNG 时保持高分辨率
4. **响应式设计**：确保移动端也能正常查看表格
5. **性能优化**：压缩图片文件大小

### 完成标准

- [ ] 所有表格数据已添加
- [ ] 所有图片已添加并正常显示
- [ ] 表格样式美观专业
- [ ] 移动端显示正常
- [ ] 数据与论文100%一致
- [ ] 无显示bug
- [ ] 加载速度合理

---

**开始时间**：2026-02-04  
**预计完成**：2026-02-04  
**状态**：进行中

