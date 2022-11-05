import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MiBeerNav from "../MiBeerNav.vue";

describe("MiBeerNav", () => {
  it("renders properly", () => {
    const wrapper = mount(MiBeerNav);

    expect(wrapper.find(".navbar-brand").text()).toContain("Beer index");
  });

  it("default slot", () => {
    const wrapper = mount(MiBeerNav, {
      slots: {
        default: "Test",
      },
    });

    expect(wrapper.find(".container-fluid").text()).toContain("Test");
  });
});
