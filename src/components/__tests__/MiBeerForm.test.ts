import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import MiBeerForm from "../MiBeerForm.vue";

describe("MiBeerForm", () => {
  describe("Submit form", () => {
    it("shouldn't emit 'submit' on empty inputs", async () => {
      const wrapper = mount(MiBeerForm);
      wrapper.trigger("submit");

      expect(wrapper.emitted("submit")).toBeFalsy();
    });

    it("should emit 'submit' query with beer name value", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-name']").setValue("Trashy Blonde");
      await wrapper.trigger("submit");

      expect(wrapper.emitted().submit[0]).toStrictEqual([
        "?beer_name=Trashy_Blonde",
      ]);
    });

    it("should emit 'submit' query with gt beer ibu value", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-ibu']").setValue(30);
      await wrapper.findAll("option").at(0)?.setValue(true);
      await wrapper.trigger("submit");

      expect(wrapper.emitted().submit[0]).toStrictEqual(["?ibu_gt=30"]);
    });

    it("should emit 'submit' query with lt beer ibu value", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-ibu']").setValue(50);
      await wrapper.findAll("option").at(1)?.setValue(true);
      await wrapper.trigger("submit");

      expect(wrapper.emitted().submit[0]).toStrictEqual(["?ibu_lt=50"]);
    });

    it("shouldn't emit 'submit' on wrong type in beer ibu input", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-ibu']").setValue("test");
      await wrapper.trigger("submit");

      expect(wrapper.emitted("submit")).toBeFalsy();
    });

    it("should emit 'submit' query with both name and ibu value inputs", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-name']").setValue("Punk");
      await wrapper.get("[data-test='beer-ibu']").setValue(50);
      await wrapper.trigger("submit");

      expect(wrapper.emitted().submit[0]).toStrictEqual([
        "?beer_name=Punk&ibu_gt=50",
      ]);
    });
  });

  describe("Reset form", () => {
    test("should clear all inputs and emit 'reset' event", async () => {
      const wrapper = mount(MiBeerForm);

      await wrapper.get("[data-test='beer-name']").setValue("Punk");
      await wrapper.get("[data-test='beer-ibu']").setValue(50);
      await wrapper.trigger("reset");

      expect(
        wrapper.get<HTMLInputElement>("[data-test='beer-name']").element.value
      ).toBe("");

      expect(
        wrapper.get<HTMLInputElement>("[data-test='beer-ibu']").element.value
      ).toBe("");

      expect(wrapper.emitted("reset")).toBeTruthy();
    });
  });
});
