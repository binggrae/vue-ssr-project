<template>
    <v-app>
        <v-main>
            <component :is="layout">
                <router-view/>
            </component>
        </v-main>
    </v-app>
</template>

<script>
    import {DEFAULT, getLayoutComponent} from "@/layouts/factory";

    export default {
        name: 'App',
        computed: {
            layout() {
                let key = DEFAULT;
                for (let i in this.$route.matched) {
                    if (this.$route.matched.hasOwnProperty(i) && this.$route.matched[i].meta.layout) {
                        key = this.$route.matched[i].meta.layout;
                    }
                }
                return getLayoutComponent(key);
            }
        },
    };
</script>
<style lang="sass">
    @import 'assets/style/style'
</style>
