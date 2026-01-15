---
title: matlab2025b移除了对sps的支持
date: 2025-10-23 22:11:01

tag:
  - matlab
  - simulink
  - mathworks
  - Specialized Power Systems

categories:
  - Tech
cover: https://telegraph.ttwwjj.ddns-ip.net/file/AgACAgUAAyEGAAShY8_eAAOVaQMP3ybMUDgK0mkpEjQIX2JPkPIAApwLaxtcBRlULdrzzFgB4_kBAAMCAAN5AAM2BA.png
description: matlab2025b移除了对sps的支持，电气专业的最好还是不要更新

---

`mathworks` 官方社区图片
![如图](https://linux.do/uploads/default/original/4X/4/f/8/4f82d0fa3357c023815f2f5e57d00150fb8539a6.png)
[链接](https://www.mathworks.com/matlabcentral/answers/2180147-unable-to-find-the-specialized-power-systems-group-in-simscape-electrical-in-newer-version-r2025b/?s_tid=ans_lp_feed_leaf)

---

# Gemini短评:


## MATLAB R2025b: Simscape Electrical 更新，移除“专业电力系统”模块

在 **MATLAB R2025b** 版本中，MathWorks 对 Simscape Electrical 进行了重要更新，其中最引人注目的变化是**移除了“专业电力系统”（Specialized Power Systems，简称 SPS）模块库**。这一变化意味着之前依赖 SPS 模块进行电力系统建模和仿真的用户，需要将模型迁移至使用标准的 Simscape Electrical 模块。

对于许多用户来说，这一变化带来了如何更新现有模型以及未来如何进行电力系统仿真的疑问。为了帮助用户平稳过渡，MathWorks 提供了名为 **`spsConversionAssistant`** 的转换助手工具。

### **迁移路径：使用 `spsConversionAssistant` 和 Simscape Electrical**

当用户在 R2025b 中打开一个包含旧的 SPS 模块的模型时，系统会提示这些模块已被移除，并建议使用 `spsConversionAssistant` 工具进行转换。这个工具旨在自动将旧的 SPS 模块替换为功能对等的现代 Simscape Electrical 模块。

然而，根据部分用户的反馈，`spsConversionAssistant` 可能无法100%自动完成所有模块的转换，尤其对于一些复杂的自定义模型，可能需要手动进行一些调整和重新配置。

### **OPAL-RT 接手 SPS 的未来发展**

值得注意的是，原 Simscape Electrical Specialized Power Systems 的技术开发和商业化将由实时仿真领域的知名公司 **OPAL-RT** 接手。OPAL-RT 宣布将致力于支持全球广大的 SPS 用户，并计划在2025年秋季推出新的软件，以延续和发展 SPS 的功能。这意味着，未来用户将可以从 OPAL-RT 获得针对电力系统仿真的专业工具和支持。

### **给用户的建议**

面对这一变化，建议 MATLAB 和 Simulink 用户采取以下措施：

*   **尽早评估现有模型**：检查您的模型中有多少依赖于 Specialized Power Systems 模块，并评估迁移的复杂性。
*   **学习使用 `spsConversionAssistant`**：熟悉这个转换工具的功能和使用方法，并了解其可能存在的局限性。
*   **探索 Simscape Electrical**：对于新的项目，建议直接使用 Simscape Electrical 的标准模块库进行建模。Simscape Electrical 提供了丰富的组件库，用于模拟电子、机电一体化和电力系统。
*   **关注 OPAL-RT 的最新动态**：对于高度依赖原 SPS 功能的用户，可以关注 OPAL-RT 公司发布的新产品信息，以便在未来获得持续的技术支持和功能更新。

总而言之，MATLAB R2025b 中 Simscape Electrical 的这一更新，是 MathWorks 推动其仿真平台现代化和标准化的一个重要步骤。虽然短期内可能会给部分用户带来模型迁移的工作，但从长远来看，统一到 Simscape Electrical 的框架下，将有助于更好地与其他物理域进行集成仿真，并利用 Simscape 平台更强大的功能。
