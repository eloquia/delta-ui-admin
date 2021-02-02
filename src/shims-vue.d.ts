declare module "*.vue" {
  import Vue, { defineComponent } from "vue";
  export const Component: ReturnType<typeof defineComponent>;
  export default Vue;
}
