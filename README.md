<h1 align="center">
Inline cutting note / 割注 / 行内夹注
</h1>
  
<div align="center">

![image](https://github.com/slotDumpling/warichu/assets/67586451/f5371ea4-5b99-4476-ad88-af2dc225359d)

</div>

**夹注是行内插入的注释，即在正文的一行内插入两行小字。行内夹注在横排的现代汉语世界并不常见，但在竖排的传统汉语书籍很常见，现代日本的竖排书籍仍在使用行内夹注（日语称为“割注”）。行内夹注对于指南、参考书、百科全书等包含大量注释的书籍来说非常重要，因为读者既可以视线不离开正文就阅读注释，也可以选择忽略夹注只看正文。**

Warichu (inline cutting note) is a type of inline notation, where two lines of small characters are inserted into the text. Warichu divides a line into two sub lines. The frequency of use of the inline cutting note is not so high. However, the inline cutting note is very important for study guides, travel guides, reference books, encyclopedias and manuals, because it is very effective for inserting notes at the point in the text where they are needed. Inline cutting note is usually used in vertical writing mode. It is very infrequently used in horizontal writing mode.

割注とは，行の途中に挿入する注（挿入注）の一種で，2行に割って（割り書きという）挿入することから，その名前が付けられている．割注の使用頻度は多くないが，その該当用語が出てきた箇所に直接補足説明できることから，学習参考書，旅行ガイド，事典類，解説書などで利用されており，人物・用語等の簡単な紹介に重要な役割を果たしている．縦組での利用が多く，横組での例は非常に少ない．

详情请看 [W3C Requirements for Japanese Text Layout](https://www.w3.org/TR/jlreq/#inline_cutting_note)

## 割注排版难题  

虽然割注是插入的两行小字，但它仍然是正文文本流的一部分。在浏览器并不原生支持的前提下，割注是很难排版的，占用多少行内空间、在何处换行、如何把一行均分为两小行等问题是很难计算的。

<div align="center">

![image](https://github.com/slotDumpling/warichu/assets/67586451/c458f3e3-5c2b-4355-adc7-ca369084d478)
![image](https://github.com/slotDumpling/warichu/assets/67586451/d4546abe-6c6b-4bbf-9ecf-f305f8fb03d9)
![image](https://github.com/slotDumpling/warichu/assets/67586451/c8847826-9cc3-4465-90fc-71c30d189ad4)

</div>

## 这个 Repo 展示了一种割注的另类实现方法

<div align="center">

![屏幕录制2023-05-10 21 39 04](https://github.com/slotDumpling/warichu/assets/67586451/6f0099c9-1d7f-4cd8-82a4-f4dc2a8627dd)

</div>

通过栅格形状的浮动伪元素限制了割注小字的空间，利用了浏览器自身能力来给割注排版，甚至可以折行。

<div align="center">

<img width="2058" alt="截屏2023-05-10 21 57 03" src="https://github.com/slotDumpling/warichu/assets/67586451/08d5e573-a917-4d57-b1b8-09c0d8c20d64">

</div>


*Just for fun，奇奇怪怪的bug很多，并且浏览器兼容性欠佳*
