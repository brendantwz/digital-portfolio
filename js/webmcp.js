/*!
 * WebMCP tools for in-browser AI agents.
 * Registers read-only tools via navigator.modelContext when the browser supports it.
 * No-op everywhere else.
 */
(function () {
    'use strict';

    var mc = typeof navigator !== 'undefined' && navigator.modelContext;
    if (!mc) return;

    var BASE = 'https://brendantwz.com/';
    var EMAIL = 'brendan@nixlab.my';

    var SERVICES = [
        { name: 'Systems Audit', problem: 'Not knowing where revenue and time are being lost', summary: 'Engineering-grade audit of your current digital infrastructure: revenue leaks, operational bottlenecks and automation opportunities. Every engagement starts here.' },
        { name: 'Digital Foundation', problem: 'The Ghost Business / The Invisible Site', summary: 'SEO-optimised website, social presence, content and email strategy for SMEs moving from no digital presence to a converting one.' },
        { name: 'Revenue Optimization (CRO)', problem: 'The Leaky Bucket / The Stagnant Store', summary: 'Technical audits that find and fix conversion leaks in e-commerce and lead-generation funnels.' },
        { name: 'Workflow Automation', problem: 'The Manual Grind / The Ceiling Effect', summary: 'AI and automation systems that remove manual data entry, inventory, order and follow-up work so operations scale without extra headcount.' }
    ];

    var CASE_STUDIES = [
        { client: 'Wasp MMA Gym', title: 'Basic Website with Lead Funnel', summary: '250% increase in lead velocity; MYR5k–10k/month in recovered revenue.', url: BASE + 'case-study-wasp.html' },
        { client: 'NordinTech', title: 'B2B Authority System', summary: 'Top 10 rankings for 5+ industry keywords; 3x average deal size; sales cycle shortened by 20%.', url: BASE + 'case-study-nordin.html' },
        { client: 'Staark', title: 'High-Performance Content Infrastructure', summary: '60% bounce rate reduction; 20% MoM organic traffic growth; 40 hours/month saved.', url: BASE + 'case-study-staark.html' },
        { client: 'Nselink', title: 'E-commerce Operations & CRO (in progress)', summary: '12% lift in checkout completion; zero inventory overselling.', url: BASE + 'case-study-nselink.html' }
    ];

    var PAGES = {
        home: 'index.html',
        how_i_work: 'resume.html',
        case_studies: 'projects.html',
        expertise: 'services.html',
        about: 'about-me.html',
        contact: 'contact.html',
        terms: 'terms.html',
        privacy: 'privacy.html'
    };

    function text(obj) {
        return { content: [{ type: 'text', text: typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2) }] };
    }

    var tools = [
        {
            name: 'get_services',
            description: 'List the consulting services Brendan.T offers and the business problem each one solves.',
            inputSchema: { type: 'object', properties: {} },
            annotations: { readOnlyHint: true },
            execute: function () { return text(SERVICES); }
        },
        {
            name: 'list_case_studies',
            description: 'List published client case studies with headline results and links.',
            inputSchema: { type: 'object', properties: {} },
            annotations: { readOnlyHint: true },
            execute: function () { return text(CASE_STUDIES); }
        },
        {
            name: 'get_contact_info',
            description: 'Get contact details for Brendan.T: email, LinkedIn and the page for requesting a systems audit.',
            inputSchema: { type: 'object', properties: {} },
            annotations: { readOnlyHint: true },
            execute: function () {
                return text({
                    email: EMAIL,
                    linkedin: 'https://www.linkedin.com/in/brendantwz/',
                    request_audit: BASE + 'contact.html',
                    response_time: 'Within 24 hours',
                    location: 'Malaysia (works remotely with clients worldwide)'
                });
            }
        },
        {
            name: 'navigate_to_page',
            description: 'Open a page of brendantwz.com in the current tab.',
            inputSchema: {
                type: 'object',
                properties: {
                    page: { type: 'string', enum: Object.keys(PAGES), description: 'Which page to open.' }
                },
                required: ['page']
            },
            execute: function (input) {
                var target = PAGES[input && input.page];
                if (!target) return text('Unknown page. Valid values: ' + Object.keys(PAGES).join(', '));
                window.location.href = target;
                return text('Navigating to ' + BASE + target);
            }
        }
    ];

    try {
        if (typeof mc.registerTool === 'function') {
            tools.forEach(function (t) { mc.registerTool(t); });
        } else if (typeof mc.provideContext === 'function') {
            mc.provideContext({ tools: tools });
        }
    } catch (e) {
        if (window.console) console.warn('WebMCP registration failed:', e);
    }
})();
