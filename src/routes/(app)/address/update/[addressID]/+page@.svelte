<script lang="ts">
  import AddressForm from "../../../../../components/AddressForm.svelte";
  import { addressData } from "../../../../../store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let name = $addressData.name;
  let gasPrice = $addressData.gasPrice;
  let waterPrice = $addressData.waterPrice;
  let electricityPrice = $addressData.electricityPrice;
  let heating = $addressData.heating;
  let internet = $addressData.internet;
  let intercom = $addressData.intercom;
  let gasRaspred = $addressData.gasRaspred;
  let abonplata = $addressData.abonplata;
  let garbage = $addressData.garbage;
  let kvartplata = $addressData.kvartplata;

  async function submitHandler() {
    const resp = await fetch("/address", {
      method: "PUT",
      body: JSON.stringify({
        id: $page.params.addressID,
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
  on:submit={submitHandler}>Изменить данные адреса</AddressForm
>

<style>
</style>
