<script lang="ts">
  import { addressData } from "../../../../../store";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import TarifForm from "../../../../../components/TarifForm.svelte";
  import DataTable from "../../../../../components/DataTable.svelte";
  import { toFixed } from "../../../../../utils";

  let prevGas = 0;
  let currGas = 0;
  $: distinctionGas = currGas - prevGas > 0 ? toFixed(currGas - prevGas) : 0;
  $: totalGas = toFixed(distinctionGas * $addressData.gasPrice);
  let prevWater = 0;
  let currWater = 0;
  $: distinctionWater =
    currWater - prevWater > 0 ? toFixed(currWater - prevWater) : 0;
  $: totalWater = toFixed(distinctionWater * $addressData.waterPrice);
  let prevElec = 0;
  let currElec = 0;
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

    await fetch(`/tarif/${$page.params.addressID}`, {
      method: "POST",
      body: JSON.stringify({
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

    goto(`/address/${$page.params.addressID}`);
  }
</script>

<article>
  <header>
    <h2>Новый Тариф - {$addressData.name}</h2>
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
    padding-block-end: 2rem;
  }

  header {
    margin-block: 2rem;
  }
</style>
