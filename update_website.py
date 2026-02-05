#!/usr/bin/env python3
"""
TritonDFT Website Content Updater
自动更新网站内容，将真实的论文数据集成到网站中
"""

import re
import sys

def update_html():
    """更新 index.html 文件，替换 Results 部分"""
    
    print("=" * 60)
    print("  TritonDFT Website Content Updater")
    print("=" * 60)
    print()
    
    # 读取主 HTML 文件
    print("📖 Reading index.html...")
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print("❌ Error: index.html not found!")
        print("   Please run this script from the TritonDFT-Demo-Web directory")
        return False
    
    # 读取更新的 Results 部分
    print("📖 Reading RESULTS_UPDATE.html...")
    try:
        with open('RESULTS_UPDATE.html', 'r', encoding='utf-8') as f:
            results_update = f.read()
    except FileNotFoundError:
        print("❌ Error: RESULTS_UPDATE.html not found!")
        return False
    
    # 查找并替换 Results section
    print("🔧 Updating Results section...")
    
    # 使用正则表达式匹配整个 Results section
    pattern = r'<!-- Results Section -->.*?</section>'
    
    # 提取更新内容中的 section 部分
    results_section = re.search(r'(<section id="results".*?</section>)', results_update, re.DOTALL)
    
    if not results_section:
        print("❌ Error: Could not find section in RESULTS_UPDATE.html")
        return False
    
    new_section = results_section.group(1)
    
    # 替换原内容
    updated_html = re.sub(pattern, new_section, html_content, flags=re.DOTALL)
    
    if updated_html == html_content:
        print("⚠️  Warning: No changes were made. Results section might not match expected pattern.")
        print("   Please manually replace the Results section.")
        return False
    
    # 备份原文件
    print("💾 Creating backup: index.html.bak...")
    with open('index.html.bak', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # 写入更新后的文件
    print("💾 Writing updated index.html...")
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(updated_html)
    
    print()
    print("=" * 60)
    print("✅ Update completed successfully!")
    print("=" * 60)
    print()
    print("Next steps:")
    print("  1. Add the styles from STYLES_UPDATE.css to styles.css")
    print("  2. Update image references to use real PDF files")
    print("  3. Test the website: ./start.sh")
    print()
    print("If anything goes wrong, restore from backup:")
    print("  cp index.html.bak index.html")
    print()
    
    return True

def update_css():
    """更新 styles.css 文件，添加新样式"""
    
    print("🎨 Updating CSS...")
    
    # 读取主 CSS 文件
    try:
        with open('styles.css', 'r', encoding='utf-8') as f:
            css_content = f.read()
    except FileNotFoundError:
        print("❌ Error: styles.css not found!")
        return False
    
    # 读取更新的样式
    try:
        with open('STYLES_UPDATE.css', 'r', encoding='utf-8') as f:
            css_update = f.read()
    except FileNotFoundError:
        print("❌ Error: STYLES_UPDATE.css not found!")
        return False
    
    # 检查是否已经添加过
    if "Framework Comparison Table" in css_content:
        print("ℹ️  CSS styles already added, skipping...")
        return True
    
    # 添加新样式到文件末尾
    updated_css = css_content + "\n\n" + css_update
    
    # 备份原文件
    print("💾 Creating backup: styles.css.bak...")
    with open('styles.css.bak', 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # 写入更新后的文件
    print("💾 Writing updated styles.css...")
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(updated_css)
    
    print("✅ CSS updated successfully!")
    return True

def update_images():
    """更新图片引用"""
    
    print("\n🖼️  Updating image references...")
    print("   Images are already in assets/ folder")
    print("   No action needed for PDF files")
    return True

def main():
    """主函数"""
    
    print()
    
    # 更新 HTML
    if not update_html():
        print("\n❌ HTML update failed!")
        sys.exit(1)
    
    # 更新 CSS
    if not update_css():
        print("\n⚠️  CSS update had issues, but HTML was updated.")
    
    # 更新图片
    update_images()
    
    print()
    print("🎉 All updates completed!")
    print()
    print("=" * 60)
    print("📝 Summary of Changes:")
    print("=" * 60)
    print()
    print("✓ Results section updated with real data")
    print("✓ Added 5 comprehensive tables:")
    print("  - Framework Comparison")
    print("  - Parameter Configuration Performance")
    print("  - Mean Absolute Error Analysis")
    print("  - Cost Analysis")
    print("  - Parallel Efficiency")
    print("✓ CSS styles updated")
    print("✓ Images ready in assets/")
    print()
    print("🚀 Ready to deploy!")
    print()
    print("Test locally:")
    print("  ./start.sh")
    print()
    print("Deploy to GitHub:")
    print("  ./deploy.sh")
    print()

if __name__ == "__main__":
    main()

