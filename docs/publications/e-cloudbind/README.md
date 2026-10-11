# E-CloudBind：Publication 展示材料

- 正式标题：An electron-density point-cloud framework for robust protein-ligand interaction prediction
- 期刊：Nature Communications，17，Article 7424（2026）
- DOI：https://doi.org/10.1038/s41467-026-74196-5
- 接收：2026-06-01；首次发表：2026-06-11；Version of record：2026-07-28
- 共同第一作者：Yujian Liu、Yutong Wang、Qingquan Wang
- 正式页面列出的通讯作者：Shidang Xu

## 作者顺序

Yujian Liu, Yutong Wang, Qingquan Wang, Meitang Peng, Yuan Chen, Yuechuan Lin, Dongxu Shen, Xiaoli Liu, Shidang Xu, Bin Liu.

## 展示材料

`metadata.json` 包含完整摘要、作者标记、图注、链接、日期、许可和来源；同一条记录已保存到 `_data/publications.yml`，用于后续页面模板。

- 首页缩略图：`images/publications/e-cloudbind/figure-1.png`，对应示例首页的概念图。
- Details 主图：`images/publications/e-cloudbind/figure-2.png`，对应方法流程图。
- 其他配图：Fig. 3–7，全部包含原始图注。
- Fig. 1–2 下载自出版社的 full 尺寸端点；Fig. 3–7 使用其公开 1200 px 版本。
- 正式论文 PDF、Supplementary Information、补充文件说明、Supplementary Data 1、同行评审 PDF 和 Source Data 已保存到 `files/publications/e-cloudbind/`。
- 摘要原文：`abstract.txt`；BibTeX：`citation.bib`。
- 代码 README、Zenodo/ Figshare 元数据及代码 v1.1 存档保存在本目录。

## 可使用的链接

- Paper：https://doi.org/10.1038/s41467-026-74196-5
- Code：https://github.com/Liuyujian0408/DPI
- Code archive：https://doi.org/10.5281/zenodo.19851869
- Data：https://doi.org/10.6084/m9.figshare.30343492

Figshare 的完整训练/测试数据 `data-dpi.zip` 大小为 4,302,229,827 bytes，保留公开下载链接和元数据，不纳入网页素材。

## 配图署名

Liu, Y., Wang, Y., Wang, Q. et al. Nature Communications 17, 7424 (2026). https://doi.org/10.1038/s41467-026-74196-5. © The Author(s) 2026. CC BY 4.0: https://creativecommons.org/licenses/by/4.0/. Images retained unchanged.

## 页面接入状态

Publication 已接入首页：`_includes/publications.html` 生成图文卡片；`_includes/publication-dialogs.html` 生成详情抽屉；`_sass/_publications.scss` 定义局部样式；`assets/js/publications.js` 控制抽屉打开、关闭、焦点返回和背景滚动。论文内容继续从 `_data/publications.yml` 读取。
