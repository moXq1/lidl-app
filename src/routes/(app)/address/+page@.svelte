<script lang="ts">
  import AddressForm from "../../../components/AddressForm.svelte";
  import { addressData } from "../../../store";
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";

  let name = "";
  let gasPrice = 0;
  let waterPrice = 0;
  let electricityPrice = 0;
  let heating = 0;
  let internet = 0;
  let intercom = 0;
  let gasRaspred = 0;
  let abonplata = 0;
  let garbage = 0;
  let kvartplata = 0;

  async function submitHandler() {
    const resp = await fetch("/address", {
      method: "POST",
      body: JSON.stringify({
        name,
        gasPrice,
        waterPrice,
        electricityPrice,
        heating,
        internet,
        intercom,
        gasRaspred,
        abonplata,
        garbage,
        kvartplata,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const data = await resp.json();
      console.log(data);
      if (!data) {
        throw new Error("No data");
      }
      addressData.updateStoreAddressData(data);
      localStorage.setItem("AddressData", JSON.stringify(data));

      goto("/", { invalidateAll: true });
    } catch (e) {
      return null;
    }
  }
</script>

<AddressForm
  bind:name
  bind:gasPrice
  bind:waterPrice
  bind:electricityPrice
  bind:heating
  bind:internet
  bind:intercom
  bind:gasRaspred
  bind:abonplata
  bind:garbage
  bind:kvartplata
  on:submit={submitHandler}>Добавить новый адрес</AddressForm
>

<style>
</style>
