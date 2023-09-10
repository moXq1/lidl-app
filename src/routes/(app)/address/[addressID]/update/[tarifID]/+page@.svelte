<script lang="ts">
  import { addressData } from "../../../../../../store";
  import { tarifData } from "../../../../../../storeTarif";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import TarifForm from "../../../../../../components/TarifForm.svelte";
  import DataTable from "../../../../../../components/DataTable.svelte";
  import { toFixed } from "../../../../../../utils";

  onMount(() => {
    if (
      $page.params.addressID !== $tarifData.addressID ||
      $page.params.tarifID !== $tarifData.id ||
      $page.params.addressID !== $addressData.id
    ) {
      goto("/");
    }
  });

  let prevGas = $tarifData.prevGas;
  let currGas = $tarifData.currGas;
  $: distinctionGas = currGas - prevGas > 0 ? toFixed(currGas - prevGas) : 0;
  $: totalGas = toFixed(distinctionGas * $addressData.gasPrice);
  let prevWater = $tarifData.prevWater;
  let currWater = $tarifData.currWater;
  $: distinctionWater =
    currWater - prevWater > 0 ? toFixed(currWater - prevWater) : 0;
  $: totalWater = toFixed(distinctionWater * $addressData.waterPrice);
  let prevElec = $tarifData.prevElec;
  let currElec = $tarifData.currElec;
  $: distinctionElec =
    currElec - prevElec > 0 ? toFixed(currElec - prevElec) : 0;
  $: totalElec = toFixed(distinctionElec * $addressData.electricityPrice);
  $: total = toFixed(
    totalGas +
      totalWater +
      totalElec +
      $addressData.abonplata +
      $addressData.garbage +
      $addressData.gasRaspred +
      $addressData.heating +
      $addressData.intercom +
      $addressData.internet +
      $addressData.kvartplata
  );

  onMount(() => {
    if ($page.params.addressID !== $addressData?.id) {
      goto("/");
    }
  });

  async function handleSubmit() {
    if (currWater < prevWater || currGas < prevGas || currElec < prevElec) {
      return;
    }
    try {
      const resp = await fetch(`/tarif/${$page.params.addressID}`, {
        method: "PUT",
        body: JSON.stringify({
          id: $tarifData.id,
          addressID: $tarifData.addressID,
          createdAt: $tarifData.createdAt,
          prevGas,
          currGas,
          distinctionGas,
          totalGas,
          prevWater,
          currWater,
          distinctionWater,
          totalWater,
          prevElec,
          currElec,
          distinctionElec,
          totalElec,
          total,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      if (!data) {
        throw new Error("No data");
      }
      addressData.updateStoreAddressData(data);
      localStorage.setItem("AddressData", JSON.stringify(data));

      goto(`/address/${$page.params.addressID}`, { invalidateAll: true });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
</script>

<article>
  <header>
    <h2>Изменить Тариф - {$addressData.name}</h2>
  </header>

  <DataTable />
  <TarifForm
    bind:prevGas
    bind:currGas
    bind:distinctionGas
    bind:totalGas
    bind:prevWater
    bind:currWater
    bind:distinctionWater
    bind:totalWater
    bind:prevElec
    bind:currElec
    bind:distinctionElec
    bind:totalElec
    bind:total
    {handleSubmit}
  />
</article>

<style>
  article {
    margin-block-start: 6em;
    padding-block-end: 1rem;
  }
  header {
    margin-block: 2rem;
  }

  header h2 {
    width: 100%;
    max-width: 100%;
  }
</style>
