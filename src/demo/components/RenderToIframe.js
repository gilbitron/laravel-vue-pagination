import { h, ref, createApp, onMounted, onBeforeUpdate } from 'vue';

export default {
    name: 'RenderToIFrame',
    props: {
        cssUrl: {
            type: String,
            default: '',
        },
        scriptUrl: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots }) {
        const iframeRef = ref(null);
        const iframeBody = ref(null);
        const iframeHead = ref(null);
        const iframeCSS = ref(null);
        const iframeScript = ref(null);
        const iframeStyle = ref(null);
        let iframeApp = null;

        onMounted(() => {
            iframeBody.value = iframeRef.value.contentDocument.body;
            iframeHead.value = iframeRef.value.contentDocument.head;
            const el = document.createElement('div');
            iframeBody.value.appendChild(el);
            iframeCSS.value = document.createElement('link');
            iframeCSS.value.rel = 'stylesheet';
            iframeCSS.value.href = props.cssUrl;
            iframeHead.value.appendChild(iframeCSS.value);
            iframeStyle.value = document.createElement('style');
            iframeStyle.value.innerHTML =
                'body { margin: 0; padding: 10px; background: #f8f9fa; }';
            iframeHead.value.appendChild(iframeStyle.value);

            iframeApp = createApp({
                name: 'IframeRender',
                setup() {
                    return () => slots.default();
                },
            }).mount(el);
        });
        onBeforeUpdate(() => {
            if (!iframeApp || !iframeRef.value) {
                return;
            }
            iframeCSS.value.href = props.cssUrl;
            if (props.scriptUrl) {
                iframeScript.value = document.createElement('script');
                iframeScript.value.id = 'custom-script';
                iframeScript.value.src = props.scriptUrl;
                iframeHead.value.appendChild(iframeScript.value);
            } else {
                document.getElementById('custom-script')?.remove();
                iframeScript.value = null;
            }
        });
        return () => h('iframe', { ref: iframeRef });
    },
};
