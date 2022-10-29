import {h, ref, createApp, onMounted} from 'vue';

export default {
    name: 'RenderToIFrame',
    props: {
        isTailwind: {
            type: Boolean,
            default: false,
        }
    },
    setup(props, { slots }) {
        const iframeRef = ref(null);
        const iframeBody = ref(null);
        const iframeHead = ref(null);
        const iframeStyle = ref(null);

        onMounted(async () => {
            const tailwindCss = props.isTailwind ? await import('../tailwind.css?inline') : null;

            iframeBody.value = iframeRef.value.contentDocument.body;
            iframeHead.value = iframeRef.value.contentDocument.head;
            const el = document.createElement('div');
            iframeBody.value.appendChild(el);
            iframeStyle.value = document.createElement('style');
            iframeStyle.value.innerHTML =
                'body { margin: 0; padding: 10px; }';
            if (tailwindCss) {
                iframeStyle.value.innerHTML += tailwindCss.default;
            }
            iframeHead.value.appendChild(iframeStyle.value);

            createApp({
                name: 'IframeRender',
                setup() {
                    return () => slots.default();
                },
            }).mount(el);
        });

        return () => h('iframe', { ref: iframeRef });
    },
};
