<script lang="ts">
  export let value: number | null;
</script>

{#if value === null}
  <span class="error">Введите значение</span>
{/if}

<style>
  .error {
    color: var(--danger);
  }
</style>
