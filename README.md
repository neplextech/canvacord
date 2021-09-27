<div class=""><article> <div class="_6d9832ac pr4-ns pl0-ns ph1-m pr3-m pr2  markdown" id="readme"><h1>
<a id="user-content-canvacord" class="anchor" href="#canvacord" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Canvacord</h1>
<p>Powerful image manipulation tool to manipulate images easily.</p>
<h1>
<a id="user-content-installation" class="anchor" href="#installation" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Installation</h1>
<div class="highlight highlight-source-shell"><pre>$ npm i canvacord</pre></div>
<p><a href="https://nodei.co/npm/canvacord/" rel="nofollow"><img src="https://camo.githubusercontent.com/fc225a8abcd93314f7680ecf411ba8e33cbdf1e8ca14a360dffab2ce1d474d9d/68747470733a2f2f6e6f6465692e636f2f6e706d2f63616e7661636f72642e706e67" alt="NPM" data-canonical-src="https://nodei.co/npm/canvacord.png" style="max-width:100%;"></a></p>
<h1>
<a id="user-content-features" class="anchor" href="#features" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Features</h1>
<ul>
<li>Super simple and easy to use <g-emoji class="g-emoji" alias="sunglasses" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f60e.png">😎</g-emoji>
</li>
<li>Faster than canvacord v4 <g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji>
</li>
<li>More than <strong>50 methods</strong>...? Yay! <g-emoji class="g-emoji" alias="tada" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f389.png">🎉</g-emoji>
</li>
<li>Built on node-canvas and no bullsh*t involved <g-emoji class="g-emoji" alias="fire" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f525.png">🔥</g-emoji>
</li>
<li>Object oriented <g-emoji class="g-emoji" alias="computer" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4bb.png">💻</g-emoji>
</li>
<li>Beginner friendly <g-emoji class="g-emoji" alias="nerd_face" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f913.png">🤓</g-emoji>
</li>
<li>Supports emojis <g-emoji class="g-emoji" alias="grinning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f600.png">😀</g-emoji>
</li>
</ul>
<h1>
<a id="user-content-documentation" class="anchor" href="#documentation" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Documentation</h1>
<p><strong><a href="https://canvacord.js.org" rel="nofollow">https://canvacord.js.org</a></strong></p>
<h1>
<a id="user-content-join-our-discord-server" class="anchor" href="#join-our-discord-server" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Join our Discord server</h1>
<p><strong><a href="https://discord.gg/2SUybzb" rel="nofollow">https://discord.gg/2SUybzb</a></strong></p>
<h1>
<a id="user-content-examples" class="anchor" href="#examples" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Examples</h1>
<h2>
<a id="user-content-rank-card" class="anchor" href="#rank-card" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Rank Card</h2>
<div class="highlight highlight-source-js"><pre><span class="pl-k">const</span> <span class="pl-s1">canvacord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"canvacord"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
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
    <span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">attachment</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">MessageAttachment</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">,</span> <span class="pl-s">"RankCard.png"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">channel</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s1">attachment</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<h3>
<a id="user-content-preview" class="anchor" href="#preview" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Preview</h3>
<p><a href="https://raw.githubusercontent.com/Snowflake107/canvacord/v5/test/images/RankCard.png" target="_blank" rel="nofollow"><img src="https://raw.githubusercontent.com/Snowflake107/canvacord/v5/test/images/RankCard.png" alt="RankCard" style="max-width:100%;"></a></p>
<h2>
<a id="user-content-other-examples" class="anchor" href="#other-examples" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Other Examples</h2>
<div class="highlight highlight-source-js"><pre><span class="pl-k">const</span> <span class="pl-v">Discord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"discord.js"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">client</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">Client</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">canvacord</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">"canvacord"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">"ready"</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"I'm online!"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">"message"</span><span class="pl-kos">,</span> <span class="pl-k">async</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">author</span><span class="pl-kos">.</span><span class="pl-c1">bot</span><span class="pl-kos">)</span> <span class="pl-k">return</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">content</span> <span class="pl-c1">===</span> <span class="pl-s">"!triggered"</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">avatar</span> <span class="pl-c1">=</span> <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">author</span><span class="pl-kos">.</span><span class="pl-en">displayAvatarURL</span><span class="pl-kos">(</span><span class="pl-kos">{</span> <span class="pl-c1">dynamic</span>: <span class="pl-c1">false</span><span class="pl-kos">,</span> <span class="pl-c1">format</span>: <span class="pl-s">'png'</span> <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">let</span> <span class="pl-s1">image</span> <span class="pl-c1">=</span> <span class="pl-k">await</span> <span class="pl-s1">canvacord</span><span class="pl-kos">.</span><span class="pl-c1">Canvas</span><span class="pl-kos">.</span><span class="pl-en">trigger</span><span class="pl-kos">(</span><span class="pl-s1">avatar</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">let</span> <span class="pl-s1">attachment</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Discord</span><span class="pl-kos">.</span><span class="pl-c1">MessageAttachment</span><span class="pl-kos">(</span><span class="pl-s1">image</span><span class="pl-kos">,</span> <span class="pl-s">"triggered.gif"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-s1">message</span><span class="pl-kos">.</span><span class="pl-c1">channel</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s1">attachment</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">client</span><span class="pl-kos">.</span><span class="pl-en">login</span><span class="pl-kos">(</span><span class="pl-s">"Your_Bot_Token_here"</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<h1>
<a id="user-content-support-me" class="anchor" href="#support-me" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Support me</h1>
<p><a href="https://paypal.me/devsnowflake" rel="nofollow"><img src="https://camo.githubusercontent.com/c8b6e8f1d8b8bdea60e95bcafbfc51d5bef0bd4fee537384952b3b9e4217003e/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f7765627374617469632f69636f6e2f70703235382e706e67" alt="" data-canonical-src="https://www.paypalobjects.com/webstatic/icon/pp258.png" style="max-width:100%;"></a></p>
<h1>
<a id="user-content-note" class="anchor" href="#note" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Note</h1>
<blockquote>
<p><g-emoji class="g-emoji" alias="warning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/26a0.png">⚠</g-emoji> | In order to use <code>Canvacord#Welcomer</code>/<code>Canvacord#Leaver</code>/<code>Canvacord#CaptchaGen</code>, you may need to install packages like <strong><a href="https://npmjs.com/package/discord-canvas" rel="nofollow">discord-canvas</a></strong> &amp; <strong><a href="https://npmjs.com/package/captcha-canvas" rel="nofollow">captcha-canvas</a></strong>.</p>
</blockquote>
</div></article></div>
