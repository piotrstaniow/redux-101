import 'headjs/dist/1.0.0/head';
import Reveal from 'reveal.js';
import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/blood.css';
import 'reveal.js/lib/css/zenburn.css';
import './style.css';

Reveal.initialize({
    // controls: true,
    //  progress: true,
    history: true,
    //  center: true,
    //  rollingLinks: true,
    //   transition: "convex",
    //- width: "90%",
    //- height: 1.0,
    dependencies: [
        // Syntax highlight for <code> elements
        { src: 'reveal.js-3.3.0/plugin/markdown/marked.js' },
        { src: 'reveal.js-3.3.0/plugin/markdown/markdown.js' },
        { src: 'reveal.js-3.3.0/plugin/notes/notes.js', async: true },
        { src: 'reveal.js-3.3.0/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
    ]
});