---
title: 杠杆策略的爆仓时间
subject: quant
topic: risk
tags:
  - leverage
  - ruin-time
  - gbm
  - kelly
difficulty: 4
status: solved
source: self
created: 2026-06-27
updated: 2026-06-27
---

# 杠杆策略的爆仓时间

## 题目

假设一个交易策略每期收益率独立同分布：

$$
R_t \sim N(\mu,\sigma^2).
$$

已知年化收益率和年化波动率分别为：

$$
\mu_a = 20\%, \qquad \sigma_a = 20\%.
$$

使用 \(L\) 倍杠杆，账户初始净值为 \(V_0=1\)。当净值跌到 \(20\%\)，即 \(0.2\)，时爆仓。账户净值过程为：

$$
V_t = \prod_{i=1}^{t}(1+LR_i).
$$

定义爆仓时间：

$$
T = \min\{t \ge 1: V_t \le 0.2\}.
$$

问题：

- 平均需要多少期交易，账户会第一次爆仓，即求 \(\mathbb E[T]\)。
- 换一种问法：如果一个策略年化收益 \(20\%\)、年化波动 \(20\%\)，应该使用几倍杠杆？

## 关键结论

原题如果严格按“简单收益正态分布”解释，\(\mathbb E[T]\) 没有简单闭式解，通常需要数值积分、动态规划或 Monte Carlo 估计。

常用的闭式结果来自连续时间 log wealth / GBM 近似。在这个近似下：

$$
0<L<10
\quad\Longrightarrow\quad
\mathbb E[T]=\infty,
$$

但这是无条件期望，因为有正概率永远不爆仓。更有意义的是：

$$
\mathbb P(T<\infty)=5^{1-10/L},
$$

以及：

$$
\mathbb E[T\mid T<\infty]
=
\frac{\log 5}{0.2L-0.02L^2},
\qquad 0<L<10.
$$

Kelly 杠杆为：

$$
L_{\text{Kelly}}
=
\frac{\mu_a}{\sigma_a^2}
=
\frac{0.2}{0.2^2}
=5.
$$

但 \(L=5\) 时最终爆仓概率为：

$$
5^{1-10/5}=5^{-1}=20\%.
$$

所以如果存在硬爆仓线，full Kelly 通常过于激进。

## 1. 离散简单收益模型

设一年有 \(N=252\) 个交易期。若每期为一天，则每期简单收益近似为：

$$
R_t \sim N(m,s^2),
$$

其中：

$$
m=\frac{\mu_a}{N},
\qquad
s=\frac{\sigma_a}{\sqrt N}.
$$

使用 \(L\) 倍杠杆后：

$$
V_t=\prod_{i=1}^t(1+LR_i),
\qquad
V_0=1.
$$

爆仓线为：

$$
b=0.2.
$$

定义首次爆仓时间：

$$
T=\inf\{t\ge 1:V_t\le b\}.
$$

目标是求：

$$
\mathbb E[T].
$$

## 2. 严格离散模型下的性质

由于题目假设的是简单收益率正态分布，而正态分布有无限左尾，所以对任意 \(L>0\)，都有：

$$
\mathbb P(1+LR_t\le 0)>0.
$$

令：

$$
p_L
=
\mathbb P\left(R_t\le -\frac1L\right)
=
\Phi\left(\frac{-1/L-m}{s}\right).
$$

再定义：

$$
\tau=\inf\left\{t\ge 1:R_t\le -\frac1L\right\}.
$$

则：

$$
\tau\sim \operatorname{Geometric}(p_L),
\qquad
\mathbb E[\tau]=\frac1{p_L}.
$$

一旦出现 \(1+LR_t\le 0\)，若之前尚未爆仓，则当前净值会变为非正数，因此一定满足：

$$
V_t\le 0.2.
$$

所以有：

$$
T\le \tau.
$$

因此：

$$
\mathbb E[T]\le \mathbb E[\tau]=\frac1{p_L}<\infty.
$$

也就是说，按题面简单收益正态模型严格解释，任意 \(L>0\) 时，爆仓最终几乎必然发生，且 \(\mathbb E[T]\) 有限。

这个结论主要来自正态分布允许单期亏损超过 \(100\%/L\)。这在金融上并不十分合理，因此它更像是模型尾部假设造成的数学结论。

## 3. 严格离散模型的积分方程

令：

$$
X_t=\log V_t.
$$

爆仓边界为：

$$
c=\log 0.2=-\log 5.
$$

当 \(X_t>c\) 时，定义：

$$
f(x)=\mathbb E_x[T],
$$

即从 \(\log V_0=x\) 出发的期望爆仓时间。

若下一期不爆仓，需要满足：

$$
x+\log(1+LR)>c.
$$

等价于：

$$
R>\frac{e^{c-x}-1}{L}.
$$

因此 \(f(x)\) 满足 Fredholm 型积分方程：

$$
f(x)
=
1+
\int_{\frac{e^{c-x}-1}{L}}^\infty
f\left(x+\log(1+Lr)\right)
\phi_{m,s}(r)\,dr,
\qquad x>c,
$$

其中 \(\phi_{m,s}\) 是 \(N(m,s^2)\) 的密度函数。

边界条件为：

$$
f(x)=0,
\qquad x\le c.
$$

所以严格离散模型下：

$$
\mathbb E[T]=f(0).
$$

这个方程一般没有简单闭式解，通常需要数值积分、动态规划或 Monte Carlo 估计。

## 4. 连续时间 log wealth 近似

实务中更常用的是 GBM 近似：

$$
\frac{dV_t}{V_t}=L\mu_a\,dt+L\sigma_a\,dW_t.
$$

于是：

$$
\log V_t
=
\left(L\mu_a-\frac12L^2\sigma_a^2\right)t
+
L\sigma_a W_t.
$$

记：

$$
X_t=\log V_t=\kappa t+\nu W_t,
$$

其中：

$$
\kappa=L\mu_a-\frac12L^2\sigma_a^2,
\qquad
\nu=L\sigma_a.
$$

爆仓时间为：

$$
T=\inf\{t\ge 0:X_t\le -\log 5\}.
$$

令：

$$
a=\log 5.
$$

则问题转化为：

$$
T=\inf\{t\ge 0:\kappa t+\nu W_t\le -a\}.
$$

## 5. 连续时间模型下的闭式解

因为：

$$
\mu_a=0.2,
\qquad
\sigma_a=0.2,
$$

所以：

$$
\kappa
=
0.2L-\frac12(0.2L)^2
=
0.2L-0.02L^2.
$$

因此：

$$
\kappa>0
\iff
0<L<10.
$$

### 情形一：\(0<L<10\)

此时 log wealth 有正漂移，账户有正概率永远不会触及爆仓线。

最终爆仓概率为：

$$
\mathbb P(T<\infty)
=
\exp\left(-\frac{2\kappa a}{\nu^2}\right).
$$

代入参数：

$$
\mathbb P(T<\infty)
=
\exp\left[-\left(\frac{10}{L}-1\right)\log 5\right]
=
5^{1-10/L}.
$$

由于：

$$
\mathbb P(T=\infty)>0,
$$

所以无条件期望为：

$$
\mathbb E[T]=\infty.
$$

但给定最终会爆仓，条件期望为：

$$
\mathbb E[T\mid T<\infty]
=
\frac{a}{\kappa}
=
\frac{\log 5}{0.2L-0.02L^2}.
$$

单位是年。若换成交易日，乘以 \(252\)。

### 情形二：\(L=10\)

此时：

$$
\kappa=0.
$$

log wealth 是零漂移 Brownian motion。它几乎必然会触及任意下方边界，因此：

$$
\mathbb P(T<\infty)=1.
$$

但首次 hitting time 的均值无穷大：

$$
\mathbb E[T]=\infty.
$$

### 情形三：\(L>10\)

此时：

$$
\kappa<0.
$$

log wealth 有负漂移，所以最终几乎必然爆仓：

$$
\mathbb P(T<\infty)=1.
$$

期望爆仓时间为：

$$
\mathbb E[T]
=
\frac{a}{-\kappa}
=
\frac{\log 5}{0.02L^2-0.2L}.
$$

单位是年。

## 6. 数值结果

| 杠杆 \(L\) | \(\kappa=0.2L-0.02L^2\) | 最终爆仓概率 | \(\mathbb E[T]\) | \(\mathbb E[T\mid T<\infty]\) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0.18 | 0.0000512% | \(\infty\) | 约 8.94 年 |
| 2 | 0.32 | 0.16% | \(\infty\) | 约 5.03 年 |
| 3 | 0.42 | 2.34% | \(\infty\) | 约 3.83 年 |
| 4 | 0.48 | 8.94% | \(\infty\) | 约 3.35 年 |
| 5 | 0.50 | 20.0% | \(\infty\) | 约 3.22 年 |
| 10 | 0 | 100% | \(\infty\) | \(\infty\) |
| 12 | -0.48 | 100% | 约 3.35 年 | 约 3.35 年 |

注意：当 \(L<10\) 时，无条件 \(\mathbb E[T]\) 是无穷大，不是因为风险小到可以忽略，而是因为存在一部分路径永远不会爆仓。更有意义的是同时看最终爆仓概率和条件爆仓时间。

## 7. 杠杆选择

长期 log growth 为：

$$
g(L)
=
L\mu_a-\frac12L^2\sigma_a^2.
$$

最大化 \(g(L)\)，得到 Kelly 杠杆：

$$
L_{\text{Kelly}}
=
\frac{\mu_a}{\sigma_a^2}
=
\frac{0.2}{0.2^2}
=5.
$$

所以理论 full Kelly 杠杆是：

$$
L=5.
$$

但此时最终爆仓概率为：

$$
\mathbb P(T<\infty)
=
5^{1-10/5}
=
5^{-1}
=
20\%.
$$

因此，如果账户有硬爆仓线 \(V_t\le 0.2\)，full Kelly 通常过于激进。

若希望最终爆仓概率不超过 \(\alpha\)，要求：

$$
5^{1-10/L}\le \alpha.
$$

解得：

$$
L
\le
\frac{10}{1+\frac{\log(1/\alpha)}{\log 5}}.
$$

例如：

| 目标最终爆仓概率 \(\alpha\) | 最大杠杆 \(L\) |
| ---: | ---: |
| 0.1% | 约 1.89 |
| 1% | 约 2.59 |
| 5% | 约 3.49 |
| 10% | 约 4.11 |
| 20% | 5.00 |

## 8. 最终结论

严格按题面的简单收益正态模型：

$$
\mathbb E[T]<\infty,
$$

但没有简单闭式解，需要解积分方程或做数值模拟。

在更常用的 GBM / log wealth 近似下：

$$
\boxed{
0<L<10
\implies
\mathbb E[T]=\infty
}
$$

但：

$$
\boxed{
\mathbb P(T<\infty)=5^{1-10/L}
}
$$

以及：

$$
\boxed{
\mathbb E[T\mid T<\infty]
=
\frac{\log 5}{0.2L-0.02L^2}
}
$$

Kelly 杠杆为：

$$
\boxed{
L_{\text{Kelly}}=5
}
$$

但对应最终爆仓概率约为：

$$
\boxed{
20\%
}
$$

所以实际使用中，若考虑模型误差、厚尾、波动聚集、交易成本和策略衰减，合理杠杆通常应显著低于 \(5\)，更可能在：

$$
\boxed{
2\sim 3
}
$$

附近。
