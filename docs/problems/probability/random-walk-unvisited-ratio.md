---
title: 随机游走越过高位时的未访问点比例
subject: probability
topic: random-walk
tags:
  - random-walk
  - hitting-time
  - renewal
  - law-of-large-numbers
difficulty: 5
status: solved
source: self
created: 2026-06-27
updated: 2026-06-27
---

# 随机游走越过高位时的未访问点比例

## 题目

设随机游走从 $S_0=0$ 出发，每一步独立，且

$$
Y_t=
\begin{cases}
+2, & \text{概率 } 1/2,\\
-1, & \text{概率 } 1/2.
\end{cases}
$$

令

$$
S_t=\sum_{i=1}^t Y_i.
$$

原题说“一个人从 $0$ 走到 $N$，每次以 $1/2$ 概率 $+2$，以 $1/2$ 概率 $-1$，问走到 $N$ 时，$0,\dots,N$ 中没有访问过的点的比例在 $N\to\infty$ 时是多少”。

这个描述有一个问题：随机游走可能从 $N-1$ 一步跳到 $N+1$，所以“恰好走到 $N$”并不一定发生。更自然、也更稳定的题目应改为：

> 第一次到达或越过 $N$ 时停止。此时 $0,1,\dots,N$ 中没有访问过的点的比例，在 $N\to\infty$ 时收敛到多少？

因此定义停时

$$
\tau_N=\inf\{t\ge 0:S_t\ge N\}.
$$

令停止时未访问的点数为

$$
U_N
=
\#\{0\le k\le N:T_k>\tau_N\},
$$

其中

$$
T_k=\inf\{t\ge 0:S_t=k\}.
$$

求

$$
\lim_{N\to\infty}\frac{U_N}{N+1}.
$$

## 结论

按上面的修正版题意，即第一次到达或越过 $N$ 时停止，未访问点比例收敛到

$$
\boxed{
\alpha^4
=
\frac{7-3\sqrt5}{2}
\approx 0.145898
}.
$$

也就是大约 $14.59\%$。其中

$$
\alpha=\frac{\sqrt5-1}{2}.
$$

下面证明会先求单个远处点最终不被访问的概率，再从相关性衰减推出比例极限，最后说明停止在 $\tau_N$ 与“最终不访问”的差别只贡献 $o(N)$ 个点。

## 1. 原题的不严谨点

如果把“走到 $N$”理解为恰好首次到达 $N$，则停时

$$
T_N=\inf\{t\ge 0:S_t=N\}
$$

并不一定有限。因为步长包含 $+2$，随机游走可以跳过 $N$。

后面会证明

$$
\mathbb P_0(T_k<\infty)
=
1-\alpha^4+\alpha^4(-\alpha)^k.
$$

因此

$$
\mathbb P_0(T_N<\infty)
\longrightarrow
1-\alpha^4
\approx 0.854102.
$$

也就是说，当 $N$ 很大时，仍有约 $14.59\%$ 的概率永远不会恰好访问 $N$。所以不加条件地说“走到 $N$ 时”是不严谨的。

## 2. 单点最终被访问的概率

先求

$$
h_k=\mathbb P_0(T_k<\infty).
$$

由空间平移不变性，

$$
h_k
=
\mathbb P_{-k}(T_0<\infty).
$$

令

$$
f(x)=\mathbb P_x(T_0<\infty).
$$

### 2.1 从正半轴打到 0

对 $x>0$，从 $x$ 出发要向下打到 $0$。由一步分析，

$$
f(x)=\frac12 f(x+2)+\frac12 f(x-1),
\qquad f(0)=1.
$$

差分方程的特征方程为

$$
r^3-2r+1=0
=
(r-1)(r^2+r-1).
$$

三个根为

$$
1,\qquad
\alpha=\frac{\sqrt5-1}{2},
\qquad
-\frac{1+\sqrt5}{2}.
$$

因为当 $x\to+\infty$ 时，打到 $0$ 的概率应趋于 $0$，有界且趋零的解只能保留根 $\alpha$。因此

$$
f(x)=\alpha^x,
\qquad x\ge 0.
$$

### 2.2 从负半轴打到 0

对 $x=-j<0$，令

$$
g_j=f(-j)=\mathbb P_{-j}(T_0<\infty).
$$

对 $j\ge 2$，由一步分析：

$$
g_j
=
\frac12 g_{j-2}
+
\frac12 g_{j+1}.
$$

等价于

$$
g_{j+1}-2g_j+g_{j-2}=0.
$$

该方程的特征根同样来自

$$
r^3-2r^2+1=0
=
(r-1)(r^2-r-1).
$$

由于 $g_j$ 是概率，必须有界，因此舍去绝对值大于 $1$ 的根。于是有界解形式为

$$
g_j=A+B(-\alpha)^j.
$$

由 $g_0=1$ 得

$$
A+B=1.
$$

再对 $j=1$ 单独写边界方程。从 $-1$ 出发，一步 $+2$ 到 $1$，一步 $-1$ 到 $-2$，所以

$$
g_1
=
\frac12 f(1)+\frac12 g_2.
$$

代入 $f(1)=\alpha$、$g_1=A-\alpha B$、$g_2=A+\alpha^2B$，得到

$$
A-\alpha B
=
\frac12\alpha+\frac12(A+\alpha^2B).
$$

联立 $A+B=1$ 可解得

$$
B=\alpha^4,
\qquad
A=1-\alpha^4.
$$

因此

$$
h_k
=
\mathbb P_0(T_k<\infty)
=
g_k
=
1-\alpha^4+\alpha^4(-\alpha)^k.
$$

于是

$$
\mathbb P_0(T_k=\infty)
=
1-h_k
=
\alpha^4\bigl(1-(-\alpha)^k\bigr).
$$

令 $k\to\infty$，得到

$$
\mathbb P_0(T_k=\infty)
\longrightarrow
\alpha^4
=
\frac{7-3\sqrt5}{2}.
$$

直观上，一个很远的正整数点最终都不被访问的概率趋于 $\alpha^4$。

## 3. 最终未访问点的比例

先考虑“最终都不访问”的点数。为简化记号，本节先用 $N$ 作分母；由于 $N/(N+1)\to1$，这与用 $N+1$ 作分母等价。令

$$
I_k=\mathbf 1_{\{T_k=\infty\}},
\qquad
A_N=\sum_{k=1}^N I_k.
$$

我们证明

$$
\frac{A_N}{N}\to \alpha^4.
$$

### 3.1 期望

由上一节，

$$
\mathbb E\frac{A_N}{N}
=
\frac1N\sum_{k=1}^N \alpha^4\bigl(1-(-\alpha)^k\bigr)
\to
\alpha^4.
$$

### 3.2 一个相关性衰减引理

为了把期望极限提升为比例极限，需要控制 $I_i$ 与 $I_j$ 的相关性。原题这一步容易写错：因为游走可以先跳过低点、访问高点，再回落访问低点，所以不能简单写成

$$
\mathbb P(T_i<\infty,T_j<\infty)=h_i h_{j-i}.
$$

正确做法是研究在已经跳过某点且以后不再回到该点的条件下，远处点是否还会被访问。

对 $d\ge 2$，定义

$$
q_d
=
\mathbb P_1(T_d=\infty\mid T_0=\infty).
$$

下面证明

$$
q_d=\alpha^4+O(\alpha^d).
$$

令

$$
e_x^{(d)}
=
\mathbb P_x(T_0=\infty,\ T_d=\infty),
\qquad 1\le x\le d-1.
$$

对 $1\le x\le d-1$，一步分析给出

$$
e_x^{(d)}
=
\frac12 e_{x+2}^{(d)}
+
\frac12 e_{x-1}^{(d)}.
$$

边界条件为

$$
e_0^{(d)}=0,
\qquad
e_d^{(d)}=0.
$$

当 $x=d-1$ 时，一步 $+2$ 会到 $d+1$。从 $d+1$ 出发若以后不访问 $d$，就自动不会访问 $0$，所以还需要边界值

$$
e_{d+1}^{(d)}
=
\mathbb P_{d+1}(T_d=\infty)
=
1-\alpha
=
\alpha^2.
$$

该递推的通解为

$$
e_x^{(d)}
=
A+B\alpha^x+C(-\alpha^{-1})^x.
$$

由三个边界条件 $e_0^{(d)}=0$、$e_d^{(d)}=0$、$e_{d+1}^{(d)}=\alpha^2$ 解出 $A,B,C$。直接代入可得

$$
\frac{e_1^{(d)}}{\alpha^2}
=
\alpha^4+O(\alpha^d).
$$

这个误差估计来自三元线性方程的直接代数。令

$$
\beta=-\alpha^{-1},
\qquad
D=C\beta^d.
$$

三条边界条件等价于

$$
A+B+D\beta^{-d}=0,
\qquad
A+B\alpha^d+D=0,
\qquad
A+B\alpha^{d+1}+\beta D=\alpha^2.
$$

其中 $\beta^{-d}=(-\alpha)^d=O(\alpha^d)$。这个三元线性方程的系数矩阵收敛到非奇异矩阵，所以 $A,B,D=O(1)$。由前两式得

$$
B=-A+O(\alpha^d),
\qquad
D=-A+O(\alpha^d).
$$

代入第三式：

$$
A(1-\beta)=\alpha^2+O(\alpha^d).
$$

又因为 $1-\beta=1+\alpha^{-1}=\alpha^{-2}$，所以

$$
A=\alpha^4+O(\alpha^d),
\qquad
B=-\alpha^4+O(\alpha^d).
$$

并且 $C=D\beta^{-d}=O(\alpha^d)$。因此

$$
e_1^{(d)}
=
A+B\alpha+C\beta
=
\alpha^4(1-\alpha)+O(\alpha^d)
=
\alpha^6+O(\alpha^d),
$$

从而

$$
\frac{e_1^{(d)}}{\alpha^2}
=
\alpha^4+O(\alpha^d).
$$

而

$$
\mathbb P_1(T_0=\infty)=1-\alpha=\alpha^2,
$$

所以

$$
q_d
=
\mathbb P_1(T_d=\infty\mid T_0=\infty)
=
\frac{e_1^{(d)}}{\alpha^2}
=
\alpha^4+O(\alpha^d).
$$

现在取 $i<j$，令 $d=j-i$。当 $d=1$ 时，在 $I_i=1$ 上，路径第一次越过 $i$ 会直接落在 $j=i+1$，所以 $I_j=0$；这只会贡献 $O(N)$ 个相邻点协方差项。

当 $d\ge2$ 时，在事件 $I_i=1$ 上，路径第一次越过 $i$ 必然是从 $i-1$ 跳到 $i+1$，之后的过程等价于从 $1$ 出发并条件于永不打到 $0$。因此由强 Markov 性和空间平移不变性，

$$
\mathbb P(I_j=1\mid I_i=1)
=
q_{j-i}.
$$

于是

$$
\operatorname{Cov}(I_i,I_j)
=
\mathbb P(I_i=1)\bigl(q_{j-i}-\mathbb P(I_j=1)\bigr).
$$

又因为

$$
\mathbb P(I_j=1)
=
\alpha^4\bigl(1-(-\alpha)^j\bigr)
=
\alpha^4+O(\alpha^j),
$$

所以存在常数 $C$，使得

$$
|\operatorname{Cov}(I_i,I_j)|
\le
C(\alpha^{j-i}+\alpha^j).
$$

于是

$$
\sum_{1\le i<j\le N}
|\operatorname{Cov}(I_i,I_j)|
=
O(N).
$$

并且单点方差和也至多为 $O(N)$，所以

$$
\operatorname{Var}\left(\frac{A_N}{N}\right)
=
O\left(\frac1N\right)
\to 0.
$$

因此

$$
\frac{A_N}{N}
\to
\alpha^4
$$

在 $L^2$ 和概率意义下成立。

### 3.3 几乎处处收敛

上面的方差估计给出

$$
\mathbb E\left[
\left(\frac{A_N}{N}-\mathbb E\frac{A_N}{N}\right)^2
\right]
=O(N^{-1}).
$$

取平方子序列 $N_m=m^2$，则

$$
\sum_{m=1}^\infty
\mathbb P\left(
\left|\frac{A_{m^2}}{m^2}-\alpha^4\right|>\varepsilon
\right)
<\infty.
$$

由 Borel-Cantelli 引理，

$$
\frac{A_{m^2}}{m^2}\to \alpha^4
\quad\text{几乎处处}.
$$

再利用 $A_N$ 单调递增：若 $m^2\le N<(m+1)^2$，则

$$
\frac{A_{m^2}}{(m+1)^2}
\le
\frac{A_N}{N}
\le
\frac{A_{(m+1)^2}}{m^2}.
$$

两端都趋于 $\alpha^4$，所以

$$
\frac{A_N}{N}\to\alpha^4
\quad\text{几乎处处}.
$$

## 4. 停在第一次到达或越过 $N$

现在回到修正版停时

$$
\tau_N=\inf\{t:S_t\ge N\}.
$$

停止时未访问点数为

$$
U_N
=
\#\{0\le k\le N:T_k>\tau_N\}.
$$

永远不访问的点在 $\tau_N$ 时一定还没访问，因此

$$
U_N\ge A_N.
$$

差别只来自那些在 $\tau_N$ 时没访问、但以后又会被访问的点。

由于步长为 $+2$ 或 $-1$，首次越过或到达 $N$ 时只能有

$$
S_{\tau_N}\in\{N,N+1\}.
$$

从 $x\ge N$ 出发再回到 $k\le N$ 的概率不超过从 $N$ 出发回到 $k$ 的概率；由第 2 节正半轴 hitting 公式，该概率至多为

$$
\alpha^{N-k}.
$$

因此

$$
\mathbb E(U_N-A_N)
\le
\sum_{k=0}^N \alpha^{N-k}
\le
\frac1{1-\alpha}
=O(1).
$$

于是

$$
\frac{\mathbb E(U_N-A_N)}{N}\to0.
$$

由 Markov 不等式，

$$
\frac{U_N-A_N}{N}\to0
$$

在概率意义下成立。

事实上还可以得到几乎处处收敛。令

$$
D_N
=
S_{\tau_N}-\inf_{t\ge \tau_N}S_t
$$

为 $\tau_N$ 之后的最大回撤。显然

$$
0\le U_N-A_N\le D_N+2.
$$

并且对任意 $r\ge 0$，

$$
\mathbb P(D_N\ge r\mid \mathcal F_{\tau_N})
\le
\alpha^r,
$$

因为从当前点向下打到距离 $r$ 的位置，其概率就是 $\alpha^r$。因此对任意 $\varepsilon>0$，

$$
\sum_{N=1}^\infty
\mathbb P\left(\frac{U_N-A_N}{N}>\varepsilon\right)
<\infty.
$$

由 Borel-Cantelli 引理，

$$
\frac{U_N-A_N}{N}\to0
\quad\text{几乎处处}.
$$

因此

$$
\frac{U_N}{N}
\to
\alpha^4
$$

在 $L^2$、概率意义下成立；在自然耦合的随机游走路径上也几乎处处成立。

最后由于

$$
\frac{U_N}{N+1}
=
\frac{N}{N+1}\cdot\frac{U_N}{N},
$$

所以原题所说的 $0,1,\dots,N$ 中未访问点比例同样收敛到 $\alpha^4$。

最终答案为

$$
\boxed{
\frac{7-3\sqrt5}{2}
\approx
0.145898
}.
$$

## 5. 如果坚持“恰好走到 $N$”

如果题目坚持“恰好走到 $N$ 时停止”，则必须改成条件问题：

> 在 $T_N<\infty$ 的条件下，问 $T_N$ 时 $0,\dots,N$ 中未访问点的比例。

不加条件时，原题不严谨，因为 $T_N$ 有正概率不存在，且这个概率不会随 $N\to\infty$ 消失。

条件版本的极限直觉上仍由远离终点的局部结构决定，但若要把它写成完整定理，需要额外处理条件化对终点附近有限宽区域以外的影响。本文采用修正版“首次到达或越过 $N$”，这个版本更自然，且上面的证明已经完整给出极限。
