import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MiPagination from "../MiPagination.vue";

type Props = InstanceType<typeof MiPagination>["$props"];

describe("MiPagination", () => {
  it("renders properly", () => {
    const wrapper = mount(MiPagination, {
      props: <Props>{
        numberPages: 2,
        activePage: 1,
      },
    });

    expect(wrapper.findAll(".page-link").length).toBe(2);
  });

  it("add class to active page", () => {
    const wrapper = mount(MiPagination, {
      props: <Props>{
        numberPages: 2,
        activePage: 1,
      },
    });

    expect(wrapper.find(".active").text()).toContain(1);
  });
});
