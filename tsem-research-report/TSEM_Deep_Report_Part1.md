<div style="page-break-after: always;"></div>

<div style="text-align: center; padding-top: 120px;">

# Tower Semiconductor Ltd. (TSEM)

## 深度研究报告 — Part I

### 产业链全景 · 公司深度概览 · 技术平台第一性原理解析

<br>

**Specialty Analog Foundry在AI光互连时代的战略定位**

<br><br>

| | |
|---|---|
| **Ticker** | NASDAQ: TSEM / TASE: TSEM |
| **股价** | $188.74 (2026.03.25 收盘) |
| **Market Cap** | ~$21.2B |
| **评级** | **买入 (Buy)** |
| **12个月目标价** | **$230** |
| **报告日期** | 2026年3月 |

<br><br>

**Henry — Skyark Research**

*Confidential — For Authorized Recipients Only*

</div>

<div style="page-break-after: always;"></div>

## 目录 (Table of Contents)

**第一章 Specialty Analog半导体产业链全景**

- 1.1 半导体产业的两条主线：Digital vs Analog
- 1.2 Specialty Analog产业链六层架构
- 1.3 Foundry在产业链中的核心枢纽地位
- 1.4 Tower Semiconductor的产业链定位：为什么是"不可替代"的

**第二章 公司深度概览**

- 2.1 公司发展史与战略演进
- 2.2 全球六座晶圆厂详解
- 2.3 商业模式与收入结构
- 2.4 终端市场多元化分析
- 2.5 管理层与企业文化
- 2.6 Intel收购案始末与战略影响

**第三章 技术平台深度解析 — 第一性原理**

- 3.1 Silicon Photonics (SiPho)：从光的物理学到1.6T光模块
- 3.2 SiGe BiCMOS：异质结双极晶体管的量子力学基础
- 3.3 BCD (Bipolar-CMOS-DMOS)：功率管理的三合一集成
- 3.4 RF-SOI：为什么绝缘体上硅是射频的最佳选择
- 3.5 CMOS Image Sensor (CIS)：从光子到电子的转换
- 3.6 MEMS：微机电系统的制造挑战
- 3.7 CPO (Co-Packaged Optics)：下一代3D异质集成
- 3.8 六大平台协同效应与竞争壁垒

<div style="page-break-after: always;"></div>

## 第一章 Specialty Analog半导体产业链全景

### 1.1 半导体产业的两条主线：Digital vs Analog

理解Tower Semiconductor的投资价值，首先需要理解半导体产业中一个常被忽视但至关重要的结构性分野：**Digital半导体与Analog半导体是两条完全不同的技术路线和商业逻辑**。

Digital半导体（以CPU、GPU、FPGA为代表）遵循Moore's Law驱动的线宽缩小路径。从28nm到7nm到3nm，每一代制程的核心目标是在单位面积上集成更多的晶体管，从而提升计算性能和能效比。这条路线的竞争格局高度集中——全球仅有TSMC、Samsung和Intel三家公司具备先进制程（7nm以下）的量产能力，资本壁垒极高（一座先进制程Fab的投资超过$20B），但产品生命周期短（通常2-3年即被下一代替代）。

Analog半导体则走的是一条截然不同的道路。Analog芯片的核心功能是处理连续的物理信号——电压、电流、光、射频、温度、压力等。这些芯片不追求线宽缩小，而是追求**器件物理的极致优化**：更低的噪声、更高的线性度、更宽的电压范围、更快的信号转换速度。一颗优秀的Analog芯片可能使用180nm甚至350nm的"古老"工艺节点，但其设计和工艺know-how的积累需要数十年。Analog芯片的产品生命周期通常为**10-20年**，客户一旦完成设计验证（Design-In），几乎不会更换供应商。

这种结构性差异导致了两个市场截然不同的竞争动态：

| 维度 | Digital半导体 | Analog/Specialty半导体 |
|------|-------------|---------------------|
| **核心驱动力** | Moore's Law (线宽缩小) | 器件物理优化 (Device Physics) |
| **典型工艺节点** | 3nm / 5nm / 7nm | 65nm / 130nm / 180nm / 350nm |
| **单座Fab投资** | $20-30B+ | $1-5B |
| **产品生命周期** | 2-3年 | 10-20年 |
| **客户切换成本** | 中等 (每代重新Tape-Out) | 极高 (重新认证12-24个月) |
| **竞争格局** | 寡头垄断 (TSMC/Samsung/Intel) | 分散但专精 (Tower/GFS/X-FAB/UMC) |
| **利润率特征** | 高毛利但周期性强 | 中等毛利但极其稳定 |
| **市场规模 (2025)** | ~$450B (含Memory) | ~$85-105B |
| **增长驱动** | AI训练/推理、HPC | AI光互连、Automotive、Industrial |

Tower Semiconductor正是Analog/Specialty半导体产业链中的核心参与者。但与Texas Instruments、Analog Devices等IDM（Integrated Device Manufacturer，集设计与制造于一体）不同，Tower采用的是**Pure-Play Foundry模式**——不设计芯片，只为客户提供晶圆代工服务。这种模式使Tower成为产业链中一个独特的"瑞士银行"角色：它服务于所有Fabless芯片设计公司和需要外部产能的IDM，不与任何客户的终端产品竞争。

### 1.2 Specialty Analog产业链六层架构

Specialty Analog半导体的产业链可以分为六个层次，从终端应用向上追溯到晶圆制造。每一层都有其独特的参与者和价值创造方式。Tower Semiconductor占据的是第四层——**晶圆代工（Wafer Foundry）**——这是整个产业链的制造核心枢纽。

![Specialty Analog半导体产业链全景图](/home/ubuntu/tsem_report/charts_deep/industry_chain.png)

**第一层：终端应用（End Applications）。** 这是价值链的最终需求来源。AI数据中心需要1.6T/3.2T光模块实现GPU集群间的高速互连；Automotive需要ADAS传感器、电池管理IC和电机驱动IC；Industrial需要工厂自动化传感器和电源管理；5G/Telecom需要射频前端模块和基站功放；Consumer需要IoT连接芯片和电源管理IC；Medical需要高精度成像传感器。这些终端应用的共同特点是：它们都需要**Analog/Mixed-Signal芯片**来连接数字世界与物理世界。

**第二层：系统/模组设计（System/Module Design）。** 这一层的参与者将芯片集成到功能模组中。例如，Coherent和II-VI将SiPho芯片封装成光模块（Transceiver）；Bosch和Continental将Power IC和传感器集成到Automotive ECU中；Cisco和Nokia将RF芯片集成到网络设备中。这些公司是Tower的间接客户——它们的需求通过第三层的芯片设计公司传导到Tower。

**第三层：芯片设计（Chip Design — Fabless/IDM）。** 这是Tower的直接客户群。Fabless公司（如Broadcom、Marvell的光通信部门）设计SiPho PIC芯片，然后委托Tower代工制造。IDM公司（如TI、Infineon、STMicroelectronics）虽然拥有自己的Fab，但在产能不足或特定工艺需求时也会使用Tower的代工服务。值得注意的是，Nvidia虽然是Fabless公司，但其对SiPho的需求是通过其光模块供应链合作伙伴间接传导到Tower的。

**第四层：晶圆代工（Wafer Foundry）—— Tower的核心定位。** 这是Tower Semiconductor在产业链中的精确位置。Tower接收客户的芯片设计（GDS文件），利用其Specialty工艺平台（SiPho、SiGe、BCD、RF-SOI、CIS、MEMS）在晶圆上制造出芯片。Tower的价值不仅在于"制造"，更在于其**工艺开发和优化能力**——每个技术平台都是数十年器件物理研究和工艺迭代的结晶。客户选择Tower不是因为它便宜，而是因为只有Tower能提供特定的工艺能力（例如，全球仅Tower和GlobalFoundries能大规模量产SiPho芯片）。

**第五层：封装测试（OSAT / Assembly & Test）。** 晶圆制造完成后，需要经过切割、封装和测试才能成为可用的芯片。这一层的参与者包括ASE、Amkor等OSAT公司。值得注意的是，Tower的CPO（Co-Packaged Optics）技术正在模糊第四层和第五层的边界——通过Wafer-Scale 3D-IC技术，Tower可以在晶圆级别完成SiPho PIC和SiGe EIC的异质集成，将部分封装功能前移到Foundry环节。

**第六层：终端产品交付。** 最终的功能产品——1.6T光模块、ADAS模组、工业传感器、5G RF前端模组等——被交付给终端客户使用。

### 1.3 Foundry在产业链中的核心枢纽地位

在上述六层架构中，Foundry（第四层）处于一个独特的枢纽位置：它是**将设计转化为物理产品的唯一通道**。无论芯片设计多么精妙，如果没有Foundry的工艺能力将其制造出来，设计就只是一堆数据文件。

对于Specialty Analog芯片而言，Foundry的重要性比Digital芯片更高。原因在于：

**工艺与设计的深度耦合。** Analog芯片的性能高度依赖于工艺参数的精确控制。一个Power MOSFET的Rdson（导通电阻）、一个SiGe HBT的fT（截止频率）、一个SiPho调制器的Insertion Loss——这些关键性能指标都是由Foundry的工艺能力决定的。客户在Tower的特定工艺平台上完成设计后，其设计与Tower的工艺参数深度绑定，迁移到其他Foundry意味着重新设计、重新验证，成本和时间都是不可接受的。

**认证周期的壁垒效应。** Automotive芯片需要通过AEC-Q100可靠性认证，这一过程通常需要12-24个月。Medical芯片需要FDA认证。Aerospace & Defense芯片需要MIL-STD认证。这些认证都是针对特定Foundry的特定工艺完成的，更换Foundry意味着重新走一遍完整的认证流程。

**产能的不可替代性。** 在SiPho领域，全球能够大规模量产的Foundry屈指可数。Tower的PH18/PH300平台是目前1.6T光模块供应链中最成熟的SiPho Foundry工艺之一。当Nvidia需要为其下一代AI网络部署1.6T光模块时，可选择的SiPho Foundry供应商极为有限。

### 1.4 Tower Semiconductor的产业链定位：为什么是"不可替代"的

Tower在Specialty Analog Foundry中的独特定位可以用一句话概括：**它是全球唯一同时拥有SiPho + SiGe BiCMOS + BCD + RF-SOI + CIS + MEMS六大Specialty工艺平台的Pure-Play Foundry。**

这种"全平台"能力的战略价值在于：

**协同效应（Synergy）。** 一个AI数据中心的光互连系统不仅需要SiPho PIC（光子集成电路），还需要SiGe BiCMOS EIC（电子集成电路）作为配套的Driver IC和TIA（跨阻放大器）。Tower是唯一能同时提供PIC和EIC代工的Foundry，这使得客户可以在同一家Foundry完成整个光模块芯片组的制造，大幅简化供应链管理。更进一步，Tower的CPO技术可以将SiPho PIC和SiGe EIC通过Wafer Bonding技术在晶圆级别进行3D异质集成，创造出全新的产品形态。

**客户锁定效应（Lock-In）。** 当一个客户在Tower的多个平台上都有产品时，其对Tower的依赖度会显著提升。例如，一个Automotive客户可能同时使用Tower的BCD平台做电源管理IC、RF-SOI平台做车载雷达前端、CIS平台做ADAS摄像头传感器。这种多平台绑定使得客户几乎不可能整体迁移到其他Foundry。

**研发效率。** 不同工艺平台之间存在技术共享。例如，Tower的BSI（Back-Side Illumination）CIS技术中积累的Wafer Bonding经验，直接被应用到了CPO的3D-IC异质集成中。SiGe BiCMOS的高速晶体管技术为SiPho平台的EIC配套提供了基础。这种跨平台的技术协同使Tower的研发投入效率高于单一平台的竞争对手。

<div style="page-break-after: always;"></div>

## 第二章 公司深度概览

### 2.1 公司发展史与战略演进

Tower Semiconductor的发展历程可以分为四个战略阶段，每个阶段都代表着公司对半导体产业趋势的一次重要判断和战略转型：

**第一阶段（1993-2005）：以色列本土Foundry的艰难起步。** Tower成立于1993年，最初是以色列政府支持的本土半导体制造项目。早期的Tower只有Migdal Haemek一座200mm Fab，主要为以色列本土的芯片设计公司提供基础CMOS代工服务。这一阶段的Tower规模小、技术平台单一、客户基础薄弱，在全球Foundry市场中几乎没有存在感。

**第二阶段（2005-2014）：Russell Ellwanger时代的全球化扩张。** 2005年，Russell Ellwanger出任CEO，开启了Tower的全球化战略。Ellwanger此前在Applied Materials担任高管，深谙半导体设备和制造的逻辑。在他的领导下，Tower通过一系列收购和合作迅速扩大了全球Fab布局：2008年收购Jazz Semiconductor（获得Newport Beach Fab 3和San Antonio Fab 9两座美国工厂）；2014年与Panasonic合资成立TPSCo（获得日本Tonami Fab 5和Uozu Fab 7两座工厂）；与STMicroelectronics达成Agrate 300mm Fab共享协议。这一阶段的核心战略是"用最小的资本支出获取最大的产能布局"——通过收购和合作而非新建Fab来实现全球化。

**第三阶段（2014-2023）：Specialty平台的深度布局。** 完成全球Fab布局后，Tower开始聚焦于Specialty工艺平台的深度开发。SiPho平台（PH18系列）在Fab 3启动研发和量产；SiGe BiCMOS平台（SBC18H3/SBC13）持续迭代；BCD平台从180nm扩展到65nm（300mm）；RF-SOI平台推出65nm节点。这一阶段的Tower从一家"什么都做一点"的通用Foundry，转型为"每个平台都做到行业领先"的Specialty Foundry。2022年Intel以$5.4B提出收购，虽然最终因中国监管未批准而终止，但这一事件验证了Tower Specialty平台组合的战略价值。

**第四阶段（2024至今）：AI光互连时代的爆发性增长。** 2024年起，AI训练集群对高速光互连的需求爆发，Tower的SiPho平台成为1.6T光模块供应链的核心。SiPho收入从FY2023的~$50M飙升至FY2024的$106M（+112%）和FY2025的$228M（+115%），成为公司增长最快的业务。2026年2月，Tower宣布与Nvidia合作开发1.6T光模块，标志着公司正式进入AI基础设施核心供应链。$920M的SiPho/SiGe产能扩张计划是Tower成立以来最大规模的资本投入，目标是在2027年实现SiPho产能5倍以上的扩张。

### 2.2 全球六座晶圆厂详解

Tower的六座晶圆厂分布在三大洲四个国家，这种多区域布局在Specialty Foundry中是独一无二的。每座Fab都有其独特的技术定位和战略角色。

![Tower Semiconductor全球晶圆厂布局](/home/ubuntu/tsem_report/charts_deep/fab_map.png)

**Fab 1 — Migdal Haemek, Israel (200mm)**

Fab 1是Tower的"大本营"——公司总部、核心R&D中心和最早的生产设施都位于此。这座Fab运营超过30年，拥有Tower最深厚的工艺积累。主要工艺平台包括SiGe BiCMOS、RF-SOI、BCD Power Management和CMOS Image Sensor。Fab 1也是Tower的Automotive认证中心，多条产线已通过AEC-Q100全系列认证。作为以色列最重要的半导体制造设施之一，Fab 1享受以色列政府的研发税收优惠和人才政策支持。地缘政治风险是Fab 1的主要关注点，但Tower通过多区域布局有效分散了这一风险。

**Fab 3 — Newport Beach, California, USA (200mm)**

Fab 3是Tower在美国的旗舰工厂，也是公司SiPho技术的发源地和当前主要产线。这座Fab原属Jazz Semiconductor，2008年被Tower收购后持续升级。Fab 3的核心工艺平台包括SiPho（PH18M/PH18DA/PH18DB）、SiGe BiCMOS、RF和Power Management。2025年，Tower以$105M延期了Fab 3的租约，确保这座关键SiPho产线的长期运营。Fab 3位于加州Newport Beach——距离硅谷和洛杉矶的光通信产业集群仅数小时车程——这一地理优势使其成为与美国客户进行Co-Development的理想场所。Fab 3也是Tower获得美国国防部ITAR认证的设施之一，可以承接Aerospace & Defense客户的敏感项目。

**Fab 9 — San Antonio, Texas, USA (200mm)**

Fab 9是Tower在美国的第二座工厂，主要聚焦于Analog、Power Management和MEMS工艺。这座Fab为Tower提供了额外的美国本土产能，特别是在MEMS领域，Fab 9是Tower全球MEMS制造的核心基地之一。San Antonio的运营成本低于加州，为Tower提供了成本优势。Fab 9也持有ITAR认证，可以服务于国防和航天客户。

**Fab 5 — Tonami, Japan (200mm)**

Fab 5位于日本富山县砺波市，通过Tower持股51%的TPSCo（TowerJazz Panasonic Semiconductor Co.）运营。这座Fab原属Panasonic的半导体制造部门，2014年通过合资方式纳入Tower体系。Fab 5主要提供Analog和Mixed-Signal工艺，服务于日本和亚太地区的客户。日本在Analog半导体设计领域拥有深厚的传统（Renesas、Rohm、Murata等），Fab 5使Tower能够贴近这些重要客户。

**Fab 7 — Uozu, Japan (300mm) ★ 战略核心**

Fab 7是Tower当前战略布局中最重要的一座工厂。这座位于日本富山县�的300mm Fab同样通过TPSCo运营，但Tower正在推进将其从51%控股升级为全资控股。Fab 7的战略重要性体现在三个方面：

首先，它是Tower唯一自有的300mm Fab（Agrate是与ST共享的）。300mm晶圆的面积是200mm的2.25倍，意味着每片晶圆可以产出更多芯片，单位成本显著降低。对于SiPho这种高ASP产品，300mm产能意味着更高的毛利率。

其次，Tower已在Fab 7部署了PH300——其最新的300mm SiPho工艺平台，具备业界最先进的低损耗Silicon Nitride (SiN)波导技术。这使Fab 7成为Tower下一代SiPho产品的核心生产基地。

第三，$920M CapEx计划中的大部分投资将用于Fab 7的产能扩张。目标是将Fab 7的SiPho/SiGe产能扩大到当前的4倍以上，使其成为全球最大的Specialty 300mm Foundry之一。全资控股后，Tower将拥有对Fab 7的完全运营控制权，可以更灵活地分配产能和投资。

**Agrate — Agrate, Italy (300mm)**

Agrate Fab是Tower与STMicroelectronics共享的300mm设施，位于意大利米兰附近。Tower在这座Fab中运营其65nm BCD Power Management和其他Specialty工艺。与ST的合作使Tower能够以较低的资本支出获得300mm产能，同时也为Tower在欧洲市场提供了一个重要的"桥头堡"。Agrate Fab的65nm BCD平台是Tower最先进的Power Management工艺，支持高达24V的操作电压，并集成了最新的Gen3 LDMOS功率器件。

### 2.3 商业模式与收入结构

Tower的商业模式可以从三个维度理解：收入来源、客户结构和定价机制。

**收入来源。** Tower的收入主要来自三个渠道：(1) **晶圆代工收入（Wafer Revenue）**——这是最大的收入来源，按每片晶圆（Per-Wafer）定价，ASP因工艺复杂度而异。SiPho晶圆的ASP显著高于传统Analog产品（估计高出3-5倍），这是利润率扩张的关键驱动力。(2) **NRE工程服务收入（Non-Recurring Engineering）**——客户在新产品开发阶段支付的一次性工程费用，包括工艺开发、设计支持、Mask制作等。NRE收入虽然占比较小，但它是未来晶圆收入的"先行指标"——NRE项目的增加意味着更多产品将在未来进入量产。(3) **长期产能合同预付款**——在SiPho产能扩张中，70%+的新增产能已通过客户预付款锁定至2028年。这些预付款不仅降低了Tower的投资风险，也提供了极高的收入可见性。

**终端市场收入结构。** Tower的收入来源高度多元化，没有单一终端市场占比超过25%。这种多元化是Specialty Foundry的典型特征——不同终端市场的需求周期不同步，为公司提供了天然的收入平滑效应。

![终端市场收入结构](/home/ubuntu/tsem_report/charts_deep/end_market.png)

FY2025的终端市场收入结构中，Data Center/AI（主要是SiPho和SiGe）占比约22%，是增长最快的板块。Industrial约20%，Automotive约18%，Consumer约17%，Mobile/IoT约13%，Medical/A&D约10%。到FY2027E，随着SiPho产能Full Ramp，Data Center/AI的占比预计将跃升至42%，成为公司最大的单一终端市场。

**技术平台收入结构。** 从技术平台维度看，Tower的收入结构正在经历一次深刻的重构。

![技术平台收入结构与增长趋势](/home/ubuntu/tsem_report/charts_deep/platform_revenue.png)

FY2025年，SiPho收入$228M（占比14.5%），同比增长115%。虽然SiPho目前还不是最大的单一平台，但其增速远超其他平台。BCD/Power Management仍是最大的单一平台（约$370M），其次是Other Analog（约$396M）和CIS/MEMS（约$292M）。SiGe/RF约$280M。到FY2027E，SiPho预计将增长至$900M（占比36%），成为公司最大的收入来源，彻底改变Tower的收入结构和增长特征。

### 2.4 管理层与企业文化

**CEO Russell Ellwanger** 自2005年起领导Tower，是公司转型的核心架构师。Ellwanger此前在Applied Materials担任高管超过15年，深谙半导体设备和制造的逻辑。在其领导下，Tower从一家以色列本土小型Foundry成长为全球Specialty Analog领导者。Ellwanger的战略眼光体现在两个关键决策上：一是2008-2014年的全球Fab收购扩张（Jazz、TPSCo），以极低的资本支出获取了全球化布局；二是早期对SiPho平台的持续投入，使Tower在AI光互连需求爆发时占据了先发优势。

**President Dr. Marco Racanelli** 负责技术战略和客户关系。Racanelli拥有半导体物理学博士学位，是Tower技术平台开发的核心推动者。CPO 3D-IC技术的商业化和PH300 300mm SiPho平台的推出都是在其领导下完成的。

**CFO Oren Shirazi** 负责财务管理和资本配置。在$920M CapEx计划的融资和执行中，Shirazi的保守财务管理风格确保了公司在大规模投资周期中维持健康的资产负债表（Net Debt/EBITDA约1.0x）。

管理层团队的长期稳定性是Tower的重要优势。核心高管的平均任期超过10年，这在半导体行业中并不常见。长期任职使管理层对公司的技术积累、客户关系和运营细节有深入的理解，能够做出更具前瞻性的战略决策。

### 2.5 Intel收购案始末与战略影响

Tower与Intel的交集是理解公司近年发展轨迹的重要背景，也是一个经典的"塞翁失马"案例。

**收购提出（2022年2月）。** Intel CEO Pat Gelsinger宣布以$5.4B（$53/股）收购Tower Semiconductor，旨在扩展Intel Foundry Services (IFS)的Specialty产能。当时的逻辑是：Intel需要Tower的Specialty工艺平台（特别是SiGe和RF-SOI）来补充IFS的先进制程能力，使IFS能够为客户提供"从先进制程到Specialty"的全栈代工服务。

**交易终止（2023年8月）。** 该交易因未获得中国监管批准而终止。Intel支付了$375M终止费给Tower。交易终止的直接原因是中美半导体博弈背景下中国对外资半导体并购的审查趋严，但更深层的原因可能是Intel自身的战略摇摆——在Gelsinger的领导下，Intel同时推进先进制程追赶、IFS扩张和成本削减，资源分散导致多条战线进展缓慢。

**NM Fab协议与破裂（2023年9月-2026年2月）。** 收购终止后，Intel与Tower签署了一项NM（New Mexico）晶圆代工协议——Tower投资$300M设备，获得Intel NM Fab超过600K光刻层/月的300mm产能。然而，2026年2月Intel表示不再履行该协议（可能与Intel自身的财务压力和战略收缩有关），双方进入调解程序。Tower已将相关客户流量重定向至日本Fab 7。

**战略影响评估。** 回顾来看，收购失败反而成为Tower的重大利好。收购价$5.4B对应当时约$53/股，而如今Tower的Market Cap已达$21.2B（约$188/股），**三年间价值增长近4倍**。如果收购成功，Tower将成为Intel的一个部门，其SiPho技术的商业化可能受到Intel内部官僚体系的制约，而非像现在这样作为独立公司快速响应市场需求。Intel NM Fab协议的破裂虽然短期内影响了部分客户的交付时间线，但Tower已成功将流量重定向至Fab 7，且Fab 7的300mm产能扩张计划将提供远超NM Fab的长期产能。

<div style="page-break-after: always;"></div>

## 第三章 技术平台深度解析 — 第一性原理

本章将从第一性原理（First Principles）出发，深入解析Tower的六大核心技术平台。对于每个平台，我们将从底层物理学开始，解释为什么这种技术能够实现特定的功能，Tower的工艺实现有何独特之处，以及其在产业链中的应用价值。

### 3.1 Silicon Photonics (SiPho)：从光的物理学到1.6T光模块

Silicon Photonics是Tower增长最快、战略价值最高的技术平台。要理解SiPho的技术本质，需要从光在硅基材料中的传播和调制原理说起。

#### 3.1.1 为什么用硅做光子器件？

光子器件（Photonic Integrated Circuit, PIC）的核心功能是在芯片上引导、调制和检测光信号。传统的光子器件使用III-V族化合物半导体（如InP、GaAs）制造，这些材料具有优异的光学性能，但制造成本高、晶圆尺寸小（通常2-4英寸）、无法利用成熟的CMOS制造基础设施。

硅（Si）作为光子器件材料的核心优势在于：

**折射率对比度（Index Contrast）。** 硅在1310nm（O-band）和1550nm（C-band）波长下的折射率约为n = 3.48，而二氧化硅（SiO₂）的折射率约为n = 1.45。这意味着Δn ≈ 2.03——这是自然界中最大的折射率对比度之一。高折射率对比度使光可以被紧密地限制在亚微米级的硅波导中（典型截面：450nm × 220nm），实现极高的集成密度。相比之下，III-V族材料的折射率对比度通常只有0.1-0.3，波导截面需要数微米，集成密度低一个数量级。

**CMOS兼容性。** 硅是CMOS工艺的基础材料。SiPho器件可以在标准CMOS Fab中使用成熟的光刻、刻蚀、薄膜沉积等工艺制造，无需专用设备。这意味着SiPho可以利用数十年CMOS工艺积累的制造精度和良率控制能力，实现大规模、低成本的量产。Tower的PH18平台正是基于其成熟的180nm CMOS工艺线开发的。

**晶圆尺寸与成本。** 硅晶圆可以做到200mm甚至300mm直径，而III-V族晶圆通常只有2-4英寸。更大的晶圆意味着每片晶圆可以产出更多芯片，单位成本大幅降低。Tower的PH300平台使用300mm晶圆，进一步降低了SiPho芯片的制造成本。

#### 3.1.2 SOI波导：光的高速公路

Tower的SiPho平台基于SOI（Silicon-on-Insulator）衬底。SOI衬底的结构从下到上依次为：硅衬底（Si Substrate）→ 埋氧层（Buried Oxide, BOX，SiO₂，约2μm厚）→ 顶层硅（Top Si，约220nm厚）。光信号在顶层硅中传播，被上下两层SiO₂（BOX和顶部包层）限制在硅芯中，通过全内反射（Total Internal Reflection）实现低损耗传输。

![SiPho工作原理 — 第一性原理解析](/home/ubuntu/tsem_report/charts_deep/sipho_principle.png)

上图(a)展示了SOI光波导的横截面。硅芯（Si Core）的典型尺寸为宽450-500nm、高220nm。光的模场（Optical Mode Profile）主要集中在硅芯中，但有一部分"尾巴"延伸到周围的SiO₂包层中。这种亚微米级的波导尺寸使得在一块芯片上可以集成数百甚至数千个光学元件——调制器、探测器、波导分路器、波分复用器等。

Tower的PH300平台还提供了**Silicon Nitride (SiN)波导**选项。SiN的折射率约为2.0，介于Si和SiO₂之间，其波导损耗比硅波导低一个数量级（<0.1 dB/cm vs ~1 dB/cm）。低损耗SiN波导对于需要长传播距离的应用（如延迟线、滤波器）至关重要。Tower声称其PH300平台提供了"业界最先进的低损耗Silicon Nitride波导"。

#### 3.1.3 硅MZM调制器：将电信号转换为光信号

在光通信链路中，调制器（Modulator）的功能是将高速电信号"印刻"到光载波上——即通过改变光的强度或相位来编码数据。Tower的SiPho平台使用**Mach-Zehnder调制器（MZM）**实现这一功能。

MZM的工作原理基于光的干涉效应。如上图(b)所示，输入光通过Y分路器被等分为两束，分别进入上下两条臂（Arm）。每条臂上都有一个相位调制器（Phase Shifter），通过施加电压改变该臂中光的传播相位。当两束光在输出端Y合路器重新汇合时：

- 如果两臂的相位差Δφ = 0（同相），两束光发生**建设性干涉**，输出光强最大 → 编码为bit "1"
- 如果两臂的相位差Δφ = π（反相），两束光发生**破坏性干涉**，输出光强最小 → 编码为bit "0"

在硅基MZM中，相位调制的物理机制是**载流子色散效应（Carrier Depletion Effect）**。硅本身没有线性电光效应（Pockels Effect），因此不能像LiNbO₃那样通过直接施加电场改变折射率。取而代之的是，通过在硅波导中嵌入PN结（PN Junction），施加反向偏压时PN结耗尽区扩大，自由载流子（电子和空穴）被抽走，导致硅的折射率发生微小变化：

> **Δn ≈ -8.8 × 10⁻²² × ΔN_e - 8.5 × 10⁻¹⁸ × (ΔN_h)^0.8**

其中ΔN_e和ΔN_h分别是电子和空穴浓度的变化量。这个折射率变化虽然很小（Δn ~ 10⁻⁴量级），但通过足够长的相位调制器（通常数毫米），可以积累足够的相位差来实现调制：

> **Δφ = (2π/λ) × Δn × L**

Tower与Coherent在2026年3月联合演示了基于Tower生产级SiPho工艺的**400Gbps/lane数据传输**，使用硅MZM调制器（无需exotic材料如TFLN或EO Polymer），瞄准下一代3.2T光模块。这一成果证明了硅MZM在高速调制领域的持续竞争力。

#### 3.1.4 Germanium光电探测器：将光信号转换回电信号

在光通信链路的接收端，需要将光信号转换回电信号。这一功能由**光电探测器（Photodetector, PD）**实现。硅本身在通信波段（1310nm/1550nm）是透明的——其带隙为1.12eV，对应的吸收截止波长约为1100nm，无法吸收O-band（1310nm）和C-band（1550nm）的光。

解决方案是使用**锗（Germanium, Ge）**。锗的带隙为0.67eV，对应的吸收截止波长约为1850nm，可以高效吸收1310nm和1550nm的光。Tower的SiPho平台通过外延生长（Epitaxial Growth）在硅波导上方沉积一层锗薄膜，形成Ge-on-Si PIN光电探测器。如上图(c)所示，光从硅波导耦合进入锗吸收层，光子被锗吸收后产生电子-空穴对，在PIN结的内建电场作用下被分离和收集，形成光电流。

Tower的Ge PIN探测器在1310nm波长下的响应度（Responsivity）约为1.0 A/W，带宽超过50GHz，满足200Gbps/lane的高速接收需求。

#### 3.1.5 Tower SiPho在1.6T光链路中的位置

理解Tower SiPho的商业价值，需要将其放在完整的1.6T光通信链路中审视。

![1.6T DR8完整光通信链路架构](/home/ubuntu/tsem_report/charts_deep/optical_link.png)

一条完整的1.6T DR8光链路包含发送端（TX）和接收端（RX）两条链路：

**TX链路：** GPU/Accelerator → SerDes (224G PAM4) → DSP → DAC → Driver IC (SiGe TIA) → **Si MZM调制器 (★ Tower SiPho)** → MUX (8λ WDM) → Fiber Coupler → SMF Fiber

**RX链路：** SMF Fiber → Fiber Coupler → DEMUX (8λ WDM) → **Ge光电探测器 (★ Tower SiPho)** → TIA (SiGe) → ADC → DSP → SerDes (224G PAM4) → GPU/Accelerator

Tower在这条链路中占据了**两个核心位置**：TX端的Si MZM调制器和RX端的Ge光电探测器。这两个器件都是SiPho PIC（Photonic Integrated Circuit）的核心组成部分，由Tower的PH18/PH300工艺制造。此外，配套的Driver IC和TIA（跨阻放大器）通常使用Tower的SiGe BiCMOS工艺制造，形成了SiPho + SiGe的协同效应。

#### 3.1.6 SiPho平台变体与产能扩张

Tower的SiPho平台包含多个工艺变体，覆盖不同的应用需求：

| 平台 | 晶圆尺寸 | 关键特性 | 主要应用 | 产线 |
|------|---------|---------|---------|------|
| PH18M | 200mm | 基础SiPho，Si波导+Ge PD | O-band DR4/DR8 Transceiver | Fab 3 |
| PH18DA | 200mm | 增强型，额外光学元件 | C-band DWDM, 长距离 | Fab 3 |
| PH18DB | 200mm | 异质集成QD激光器 (DARPA) | 全集成PIC (无需外部激光器) | Fab 3 |
| PH300 | 300mm | 最先进SiN波导，高密度 | 下一代1.6T/3.2T, CPO | Fab 7 |

$920M CapEx计划的核心目标是将SiPho/SiGe产能扩大到当前（Q4 2025年化）出货量的**5倍以上**。投资主要集中在Fab 7（300mm PH300平台）和Fab 3（200mm PH18平台）。目标时间线：2026年Q4完成全部设备安装和工艺认证，2027年Q1开始Full Starts。**70%+的新增产能已通过客户预付款锁定至2028年**，提供了极高的投资回报可见性。

### 3.2 SiGe BiCMOS：异质结双极晶体管的量子力学基础

SiGe BiCMOS是Tower的第二大高增长平台，与SiPho形成天然的技术协同——SiGe BiCMOS提供光模块所需的高速电子集成电路（EIC），包括Driver IC、TIA（跨阻放大器）和CDR（时钟数据恢复）。

#### 3.2.1 为什么需要SiGe？

在高速通信电路中，晶体管的两个关键性能指标是**截止频率fT**（晶体管能够提供电流增益的最高频率）和**最大振荡频率fmax**（晶体管能够提供功率增益的最高频率）。标准硅CMOS晶体管在65nm节点下的fT约为200GHz，但其噪声性能和线性度不足以满足高速光通信接收器的需求。

SiGe BiCMOS通过在标准硅BJT（双极结型晶体管）的基区引入锗（Ge），创造了一种**异质结双极晶体管（Heterojunction Bipolar Transistor, HBT）**，其性能远超标准硅BJT。

![SiGe BiCMOS — 异质结双极晶体管工作原理](/home/ubuntu/tsem_report/charts_deep/sige_principle.png)

#### 3.2.2 SiGe HBT的物理学原理

上图(a)展示了SiGe HBT与标准Si BJT的能带图对比。关键区别在于基区（Base）：

在标准Si BJT中，发射极（Emitter）、基区（Base）和集电极（Collector）都是硅，带隙均为1.12eV。电子从发射极注入基区后，需要通过扩散（Diffusion）穿越基区到达集电极。扩散是一个随机过程，速度受限于基区宽度和电子扩散系数。

在SiGe HBT中，基区使用SiGe合金（Si₁₋ₓGeₓ，x从发射极侧的~5%渐变到集电极侧的~25%）。由于Ge的带隙（0.67eV）小于Si的带隙（1.12eV），SiGe合金的带隙随Ge含量增加而减小。这种**渐变的Ge分布**在基区中创造了一个内建电场（Built-in Electric Field）：

> **E_built-in = (1/q) × (dEg/dx) ≈ ΔEg(Ge) / (q × W_B)**

其中ΔEg(Ge)是基区两端的带隙差（约50-100meV），W_B是基区宽度。这个内建电场将电子从发射极侧"加速"推向集电极侧，使电子穿越基区的速度从扩散模式变为**漂移模式（Drift）**——速度提升数倍。

这一物理机制带来了三个关键性能提升：

**更高的fT。** 电子穿越基区的时间（Transit Time）大幅缩短，fT从标准Si BJT的~50GHz提升到SiGe HBT的**200+ GHz**。Tower的SBC18H3平台的fT > 200GHz，fmax > 300GHz。

**更低的噪声。** SiGe HBT的基区电阻（r_bb）更低（因为SiGe合金的电导率高于纯硅），噪声系数（Noise Figure）在40GHz下低于1.3dB。这对于光通信接收器中的TIA至关重要——TIA需要在极低的输入光功率下（通常nA级光电流）放大信号，噪声性能直接决定了接收灵敏度。

**CMOS兼容集成。** SiGe BiCMOS工艺将高性能SiGe HBT与标准CMOS晶体管集成在同一芯片上。HBT负责高速模拟前端（Driver、TIA），CMOS负责数字控制逻辑（CDR、DSP）。这种单片集成避免了多芯片方案的互连损耗和封装复杂度。

#### 3.2.3 Tower SiGe BiCMOS平台

Tower提供两个主要的SiGe BiCMOS工艺节点：

| 平台 | 节点 | fT / fmax | 噪声系数 | 主要应用 |
|------|------|-----------|---------|---------|
| SBC18H3 | 0.18μm | >200 / >300 GHz | <1.3dB @ 40GHz | 光通信TIA/Driver, 5G mmWave |
| SBC13 | 0.13μm | >250 / >350 GHz | <1.0dB @ 40GHz | 下一代高速SerDes, 卫星通信 |

SiGe BiCMOS与SiPho的协同效应是Tower独特竞争优势的核心。在CPO（Co-Packaged Optics）架构中，SiPho PIC（光子集成电路）和SiGe EIC（电子集成电路）需要通过Wafer Bonding技术进行3D异质集成。Tower是全球唯一能同时提供SiPho PIC和SiGe EIC代工、并具备Wafer Bonding 3D-IC集成能力的Foundry。

### 3.3 BCD (Bipolar-CMOS-DMOS)：功率管理的三合一集成

BCD是Tower最成熟、收入贡献最大的技术平台之一。BCD的核心理念是将三种不同类型的晶体管——Bipolar、CMOS和DMOS——**单片集成**在同一块芯片上，每种晶体管负责不同的功能。

![BCD功率管理平台 — 三合一集成架构](/home/ubuntu/tsem_report/charts_deep/bcd_principle.png)

#### 3.3.1 三种器件的分工

**Bipolar (NPN/PNP)：精密模拟。** 双极晶体管具有优异的匹配性（Matching）、低1/f噪声和高跨导（gm），是精密模拟电路的首选器件。在BCD芯片中，Bipolar晶体管用于实现运算放大器（Op-Amp）、带隙基准电压源（Bandgap Reference）、电流镜（Current Mirror）等精密模拟功能块。这些功能块提供芯片所需的精确电压和电流基准。

**CMOS (NMOS/PMOS)：数字控制。** CMOS晶体管用于实现数字控制逻辑——PWM控制器、通信接口（I²C/SPI）、状态机、非易失性存储器（NVM）等。CMOS的优势是功耗极低（静态功耗接近零）和集成密度高。在现代BCD芯片中，数字控制逻辑的复杂度不断提升，Tower的65nm BCD平台提供了高密度数字库（Digital Library），支持复杂的数字控制算法集成。

**DMOS (LDMOS/VDMOS)：高压功率开关。** DMOS（Double-diffused MOS）是BCD芯片中的"肌肉"——负责高压、大电流的功率开关功能。LDMOS（Lateral DMOS）的关键参数是**Rdson**（导通电阻）和**BVdss**（击穿电压）。Tower的BCD平台覆盖从5V到700V的全电压范围，其中65nm BCD（300mm）支持高达24V的操作电压，180nm BCD（200mm）支持高达700V。

如上图(b)所示，Tower的BCD平台覆盖了从5V USB PD Controller到700V AC-DC Converter的全电压范围应用矩阵。2026年3月，Tower推出了**Gen3 LDMOS**功率器件家族，专门针对"AI Power Wall"需求——AI服务器的功耗从传统服务器的~500W飙升到GPU服务器的~10kW，对电源管理IC的效率和功率密度提出了前所未有的要求。Tower的Gen3 LDMOS提供了业界最优的Rdson × Qgd（导通电阻与栅极电荷的乘积，是功率MOSFET的核心品质因数），支持Monolithic Smart Power Stage和DrMOS应用。

### 3.4 RF-SOI：为什么绝缘体上硅是射频的最佳选择

RF-SOI（Radio Frequency Silicon-on-Insulator）是Tower服务于5G、WiFi和IoT市场的核心平台。要理解RF-SOI的技术优势，需要从RF开关的物理学说起。

![RF-SOI工作原理](/home/ubuntu/tsem_report/charts_deep/rfsoi_principle.png)

#### 3.4.1 RF开关的核心品质因数：Ron × Coff

在射频前端模块中，开关（Switch）是最基础的功能块——它负责在不同的天线、频段和收发模式之间切换信号路径。RF开关的性能由一个关键品质因数决定：**Ron × Coff**（导通电阻与关断电容的乘积，单位为飞秒fs）。

Ron（导通电阻）决定了开关导通时的信号损耗——Ron越小，插入损耗（Insertion Loss）越低。Coff（关断电容）决定了开关关断时的信号隔离度——Coff越小，隔离度（Isolation）越高。Ron × Coff的乘积是一个物理极限指标：降低Ron通常需要增大晶体管面积，但更大的面积会增加Coff，反之亦然。

在传统Bulk CMOS工艺中，晶体管的源/漏与低阻衬底之间存在显著的**寄生衬底电容（Parasitic Substrate Capacitance, Csub）**。这个寄生电容叠加在Coff上，使得Bulk CMOS的Ron × Coff通常大于200fs——对于5G mmWave频段的RF开关来说，这是不可接受的。

#### 3.4.2 SOI的物理学优势

SOI衬底通过在硅活性层和衬底之间插入一层**埋氧层（Buried Oxide, BOX）**，从物理上隔断了活性器件与衬底之间的电学连接。这一简单但关键的结构变化带来了三个核心优势：

**消除衬底寄生电容。** BOX层（通常200-400nm厚的SiO₂）将活性器件与衬底完全隔离，Csub降低到几乎为零。Tower的RF-SOI平台进一步使用**高阻衬底（High-Resistivity Substrate, HR-Si，ρ > 1000 Ω·cm）**和**Trap-Rich Layer**，将衬底相关的RF损耗降到最低。

**Ron × Coff < 60fs。** 消除Csub后，RF-SOI的Ron × Coff可以做到<60fs——比Bulk CMOS好3倍以上。这意味着在相同的插入损耗下，RF-SOI开关的隔离度高出10-15dB；或者在相同的隔离度下，插入损耗低0.3-0.5dB。

**高fT LNA器件。** Tower的RF-SOI平台提供fT > 450GHz的LNA（低噪声放大器）器件，支持mmWave频段（28GHz/39GHz）的5G应用。

Tower的RF-SOI平台在全球6座Fab中均有部署（65nm节点在Agrate和Fab 7的300mm线上），为客户提供了多区域sourcing的灵活性。

### 3.5 CMOS Image Sensor (CIS)：从光子到电子的转换

Tower的CIS平台提供先进的CMOS图像传感器工艺，覆盖从110nm到65nm的工艺节点，支持FSI（Front-Side Illumination）和BSI（Back-Side Illumination）两种架构。

CIS的核心工作原理是利用硅的光电效应——当波长短于1100nm的光子（可见光和近红外）照射到硅表面时，光子被硅吸收，产生电子-空穴对。每个像素中的光电二极管（Photodiode）收集这些光生电子，积分一段时间后读出电荷量，即可得到该像素的光强信息。

Tower的BSI技术是CIS平台的核心竞争力。在传统FSI架构中，光从芯片正面（金属布线层一侧）入射，需要穿过多层金属和介质层才能到达光电二极管，导致量子效率（Quantum Efficiency）降低和串扰（Crosstalk）增加。BSI架构将芯片翻转，光从背面（硅衬底一侧）直接入射到光电二极管，避免了金属层的遮挡，量子效率提升30-50%。

BSI的制造需要**晶圆减薄（Wafer Thinning）**和**晶圆键合（Wafer Bonding）**技术——将CMOS读出电路晶圆和光电二极管晶圆键合在一起，然后将光电二极管晶圆减薄到仅数微米。Tower在BSI Wafer Bonding方面拥有多年的大规模量产经验，这一技术积累直接被应用到了CPO的3D-IC异质集成中。

### 3.6 MEMS：微机电系统的制造挑战

Tower的MEMS（Micro-Electro-Mechanical Systems）平台支持惯性传感器（加速度计、陀螺仪）、压力传感器、MEMS麦克风和MEMS振荡器等器件的制造。MEMS的独特之处在于它需要在硅芯片上制造**可动的机械结构**——悬臂梁、薄膜、梳齿电容等——这对制造工艺提出了与标准CMOS完全不同的要求。

MEMS制造的核心挑战包括：深硅刻蚀（Deep Reactive Ion Etching, DRIE）以形成高深宽比的机械结构；牺牲层释放（Sacrificial Layer Release）以创造可动结构的自由空间；真空封装（Vacuum Packaging）以降低空气阻尼提升传感器灵敏度。Tower在Fab 3（Newport Beach）和Fab 1（Migdal Haemek）提供MEMS制造能力，服务于高端Industrial和Medical客户。

### 3.7 CPO (Co-Packaged Optics)：下一代3D异质集成

CPO是Tower最具前瞻性的技术布局，代表了光互连技术的下一个演进方向。

![CPO vs Pluggable Optics架构对比](/home/ubuntu/tsem_report/charts_deep/cpo_comparison.png)

#### 3.7.1 为什么需要CPO？

当前主流的光互连架构是**Pluggable Optics**——光模块作为一个独立的可插拔模块，通过PCB走线与交换机ASIC连接。这种架构在800G及以下速率时工作良好，但在1.6T及更高速率时面临三个根本性挑战：

**PCB走线损耗。** 在112Gbaud PAM4信号速率下，PCB走线的信号衰减约为1-2dB/inch。从ASIC到光模块的典型走线长度为4-8英寸，信号衰减可达8-16dB。为了补偿这种衰减，需要在光模块内部增加DSP进行信号重定时（Retiming），这增加了功耗和延迟。

**功耗问题。** Pluggable光模块的功耗约为15-20W/模块（1.6T），其中DSP占了约40-50%。一台拥有64个光模块端口的交换机，仅光模块的功耗就超过1kW。

**散热瓶颈。** Pluggable模块的面板密度受限于散热能力。随着每端口速率从800G提升到1.6T和3.2T，面板散热成为系统设计的主要瓶颈。

CPO通过将光子芯片（PIC）和电子芯片（EIC）**共封装**在交换机ASIC旁边（甚至堆叠在ASIC上方），从根本上解决了上述三个问题：

- **消除PCB走线损耗：** PIC和EIC之间的连接从PCB走线变为die-to-die的微米级互连，信号衰减降低到几乎为零，无需DSP retiming。
- **功耗降低40-60%：** 去除DSP后，光模块功耗大幅下降。
- **带宽密度提升10x+：** CPO的紧凑封装使得单位面积的光互连带宽密度提升一个数量级。

#### 3.7.2 Tower的CPO技术

2025年11月，Tower宣布将其成熟的300mm Wafer Bonding技术（原用于BSI CIS量产）扩展到CPO领域。Tower的CPO方案将SiPho PIC晶圆和SiGe BiCMOS EIC晶圆通过Wafer-Scale 3D-IC技术键合在一起，形成完全集成的光电混合芯片。

Tower的CPO技术优势在于：

**成熟的Wafer Bonding量产经验。** Tower在BSI CIS领域已有多年的大规模Wafer Bonding量产经验（200mm和300mm），对准精度和键合可靠性已经过充分验证。将这一技术扩展到SiPho + SiGe的异质集成是自然的技术延伸。

**完整的PIC + EIC工艺能力。** Tower是唯一能同时提供SiPho PIC（PH18/PH300）和SiGe EIC（SBC18H3/SBC13）代工的Foundry。客户可以在同一家Foundry完成PIC设计、EIC设计和3D集成，大幅简化供应链。

**Cadence EDA工具链支持。** Tower与Cadence合作开发了完整的3D-IC设计流程（Virtuoso Studio Heterogeneous Integration），支持多PDK的协同仿真和验证。这降低了客户采用CPO技术的设计门槛。

### 3.8 六大平台协同效应与竞争壁垒

Tower的六大技术平台不是孤立存在的，而是形成了一个相互关联的**技术生态系统**。这种生态系统效应是Tower最深层的竞争壁垒。

| 协同关系 | 平台A | 平台B | 协同价值 |
|---------|-------|-------|---------|
| 光电集成 | SiPho PIC | SiGe BiCMOS EIC | 同一Foundry提供完整光模块芯片组 |
| CPO 3D-IC | SiPho + SiGe | BSI CIS (Wafer Bonding) | CIS的Wafer Bonding技术直接用于CPO |
| AI Power | BCD Power Mgmt | SiPho (AI数据中心) | 同一客户的电源和光互连需求 |
| Automotive | BCD + RF-SOI + CIS | — | 同一Automotive客户的多平台需求 |
| 5G/Telecom | RF-SOI + SiGe | — | RF前端 + 基站回传光通信 |

这种跨平台协同使Tower能够为客户提供"一站式"的Specialty Analog代工服务，创造了极高的客户粘性和切换成本。任何竞争对手要复制Tower的全平台能力，需要数十年的工艺积累和数十亿美元的投资——这是一条几乎不可能的追赶路径。

<div style="page-break-after: always;"></div>

---

**免责声明：** 本报告仅供研究参考，不构成任何投资建议或买卖推荐。投资者应根据自身风险承受能力和投资目标做出独立判断。过往业绩不代表未来表现。所有预测和估值均基于公开信息和分析师假设，实际结果可能存在重大差异。Skyark Research不对因使用本报告而产生的任何损失承担责任。

---

*Henry — Skyark Research | 2026年3月*

