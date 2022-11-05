import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MiAlert from "../MiAlert.vue";

type Props = InstanceType<typeof MiAlert>["$props"];

describe("MiAlert", () => {
  it("renders properly", () => {
    const wrapper = mount(MiAlert, {
      props: <Props>{
        type: "danger",
        message: "Hello",
      },
    });

    expect(wrapper.html()).toContain("Hello");
    expect(wrapper.classes()).toContain("alert-danger");
  });
});
