<div class="">

<article>

<div class="_6d9832ac pr4-ns pl0-ns ph1-m pr3-m pr2  markdown" id="readme">

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#canvacord)Canvacord

Powerful image manipulation tool to manipulate images easily.

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#installation)Installation

<div class="highlight highlight-source-shell">

<pre>$ npm i canvacord</pre>

</div>

[![NPM](https://camo.githubusercontent.com/fc225a8abcd93314f7680ecf411ba8e33cbdf1e8ca14a360dffab2ce1d474d9d/68747470733a2f2f6e6f6465692e636f2f6e706d2f63616e7661636f72642e706e67)](https://nodei.co/npm/canvacord/)

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#features)Features

*   Super simple and easy to use <g-emoji class="g-emoji" alias="sunglasses" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png">😎</g-emoji>
*   Faster than canvacord v4 <g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji>
*   More than **50 methods**...? Yay! <g-emoji class="g-emoji" alias="tada" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f389.png">🎉</g-emoji>
*   Built on node-canvas and no bullsh*t involved <g-emoji class="g-emoji" alias="fire" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f525.png">🔥</g-emoji>
*   Object oriented <g-emoji class="g-emoji" alias="computer" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4bb.png">💻</g-emoji>
*   Beginner friendly <g-emoji class="g-emoji" alias="nerd_face" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f913.png">🤓</g-emoji>
*   Supports emojis <g-emoji class="g-emoji" alias="grinning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f600.png">😀</g-emoji>

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#documentation)Documentation

**[https://canvacord.js.org](https://canvacord.js.org)**

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#join-our-discord-server)Join our Discord server

**[https://discord.gg/2SUybzb](https://discord.gg/2SUybzb)**

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#examples)Examples

## [<span aria-hidden="true" class="octicon octicon-link"></span>](#rank-card)Rank Card

<div class="highlight highlight-source-js">

<pre><span class="pl-k">const</span> <span class="pl-s1">canvacord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"canvacord"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">img</span> <span class="pl-c1">=</span> <span class="pl-s">"https://cdn.discordapp.com/embed/avatars/0.png"</span><span class="pl-kos">;</span>

<span class="pl-k">const</span> <span class="pl-s1">userData</span> <span class="pl-c1">=</span> <span class="pl-en">getDataSomehow</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-k">const</span> <span class="pl-s1">rank</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-s1">canvacord</span><span class="pl-kos">.</span><span class="pl-c1">Rank</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setAvatar</span><span class="pl-kos">(</span><span class="pl-s1">img</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setCurrentXP</span><span class="pl-kos">(</span><span class="pl-s1">userData</span><span class="pl-kos">.</span><span class="pl-c1">xp</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setRequiredXP</span><span class="pl-kos">(</span><span class="pl-s1">userData</span><span class="pl-kos">.</span><span class="pl-c1">requiredXP</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setStatus</span><span class="pl-kos">(</span><span class="pl-s">"dnd"</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setProgressBar</span><span class="pl-kos">(</span><span class="pl-s">"#FFFFFF"</span><span class="pl-kos">,</span> <span class="pl-s">"COLOR"</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setUsername</span><span class="pl-kos">(</span><span class="pl-s">"Snowflake"</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">setDiscriminator</span><span class="pl-kos">(</span><span class="pl-s">"0007"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">rank</span><span class="pl-kos">.</span><span class="pl-en">build</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
    <span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=></span> <span class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">attachment</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">MessageAttachment</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">,</span> <span class="pl-s">"RankCard.png"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">channel</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s1">attachment</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre>

</div>

### [<span aria-hidden="true" class="octicon octicon-link"></span>](#preview)Preview

[![RankCard](https://raw.githubusercontent.com/Snowflake107/canvacord/v5/test/images/RankCard.png)](https://raw.githubusercontent.com/Snowflake107/canvacord/v5/test/images/RankCard.png)

## [<span aria-hidden="true" class="octicon octicon-link"></span>](#other-examples)Other Examples

<div class="highlight highlight-source-js">

<pre><span class="pl-k">const</span> <span class="pl-v">Discord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"discord.js"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">client</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">Client</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">canvacord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"canvacord"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">"ready"</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=></span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"I'm online!"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">"message"</span><span class="pl-kos">,</span> <span class="pl-k">async</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">)</span> <span class="pl-c1">=></span> <span class="pl-kos">{</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">author</span><span class="pl-kos">.</span><span class="pl-c1">bot</span><span class="pl-kos">)</span> <span class="pl-k">return</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">content</span> <span class="pl-c1">===</span> <span class="pl-s">"!triggered"</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">avatar</span> <span class="pl-c1">=</span> <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">author</span><span class="pl-kos">.</span><span class="pl-en">displayAvatarURL</span><span class="pl-kos">(</span><span class="pl-kos">{</span> <span class="pl-c1">dynamic</span>: <span class="pl-c1">false</span><span class="pl-kos">,</span> <span class="pl-c1">format</span>: <span class="pl-s">'png'</span> <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">let</span> <span class="pl-s1">image</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">canvacord</span><span class="pl-kos">.</span><span class="pl-c1">Canvas</span><span class="pl-kos">.</span><span class="pl-en">trigger</span><span class="pl-kos">(</span><span class="pl-s1">avatar</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">let</span> <span class="pl-s1">attachment</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">MessageAttachment</span><span class="pl-kos">(</span><span class="pl-s1">image</span><span class="pl-kos">,</span> <span class="pl-s">"triggered.gif"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">channel</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s1">attachment</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">login</span><span class="pl-kos">(</span><span class="pl-s">"Your_Bot_Token_here"</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre>

</div>

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#support-me)Support me

[![](https://camo.githubusercontent.com/c8b6e8f1d8b8bdea60e95bcafbfc51d5bef0bd4fee537384952b3b9e4217003e/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f7765627374617469632f69636f6e2f70703235382e706e67)](https://paypal.me/devsnowflake)

# [<span aria-hidden="true" class="octicon octicon-link"></span>](#note)Note

> <g-emoji class="g-emoji" alias="warning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/26a0.png">⚠</g-emoji> | In order to use `Canvacord#Welcomer`/`Canvacord#Leaver`/`Canvacord#CaptchaGen`, you may need to install packages like **[discord-canvas](https://npmjs.com/package/discord-canvas)** & **[captcha-canvas](https://npmjs.com/package/captcha-canvas)**.

</div>

</article>

</div>
