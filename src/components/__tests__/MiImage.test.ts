import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MiImage from "../MiImage.vue";
import MiLoading from "../MiLoading.vue";

type Props = InstanceType<typeof MiImage>["$props"];
describe("MiImage", () => {
  it("renders properly", async () => {
    const wrapper = mount(MiImage, {
      props: <Props>{
        srcImg: "https://images.punkapi.com/v2/keg.png",
        alt: "keg",
      },
    });

    expect(wrapper.findComponent(MiLoading).exists()).toBeTruthy();
    await wrapper.get("img").trigger("load");
    expect(wrapper.findComponent(MiLoading).exists()).toBeFalsy();

    expect(wrapper.get("img").attributes("alt")).toBe("keg");
    expect(wrapper.get("img").attributes("src")).toBe(
      "https://images.punkapi.com/v2/keg.png"
    );
  });
});
