import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import MiCardBeer from "../MiCardBeer.vue";

type Props = InstanceType<typeof MiCardBeer>["$props"];

const beer: Props = {
  id: 1,
  name: "Hopped-Up Brown Ale",
  ibu: 85,
  foodPairing: [
    "Butternut squash and sage soup",
    "Roast beef and horseradish sandwich",
    "Fudge",
  ],
};

describe("MiCardBeer", () => {
  it("should render", () => {
    const wrapper = mount(MiCardBeer, {
      props: {
        ...beer,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.find(".card-title").text()).toBe(beer.name);
    expect(wrapper.find(".card-text").text()).toBe("IBU: " + beer.ibu);

    wrapper.findAll(".list-group-item").find((text, index) => {
      expect(text.html()).toContain(beer.foodPairing[index]);
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to.params.id).toBe(
      beer.id
    );
  });
});
