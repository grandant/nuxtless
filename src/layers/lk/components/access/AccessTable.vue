<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { SortOrder } from "~~/src/types/default";

import type { TableColumn, TableRow } from "@nuxt/ui";

type Data = {
  id: string;
  accessStartDate?: Date;
  accessEndDate?: Date | null;
  isCurrentlyActive:boolean;
  productContent:{
    name:string
    slug:string,
    id:string
  }
};

const { i18NBaseUrl } = useRuntimeConfig().public;
const { locale, d, t } = useI18n();
const localePath = useLocalePath();
const { copy } = useClipboard();
const toast = useToast();

const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

const ULink = resolveComponent("ULink");
const UCheckbox = resolveComponent("UCheckbox");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const options = {
  sort: { createdAt: 'DESC' },
  take: 10,
};

const { data: accsessesData, refresh:refresh } = await useAsyncGql(
  "GetAccesses",
  {
    options,
  },
  {
    immediate: false,
    server: false,
  },
);


const tableData = computed<Data[]>(() =>
  accsessesData.value?.accesses?.items.map((item, index) => ({
    ...item,
    accessStartDate: d(new Date(item.accessStartDate)),
    accessEndDate: d(new Date(item.accessEndDate)),

  })),
);

const columns: TableColumn<Data>[] = [
/*  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },*/
  {
    accessorKey: "productContent",
    header: t("messages.general.product"),
    cell: ({ row }) => {
      const productContent = row.getValue("productContent")
      return h(ULink, {
        to:localePath('/product/'+ productContent.slug),
      },[productContent.name])
    },
  },
  {
    accessorKey: "accessStartDate",
    header: t("messages.general.dates.startDate"),
    cell: ({ row }) => `${row.getValue("accessStartDate")}`,
  },
  {
    accessorKey: "accessEndDate",
    header: t("messages.general.dates.endDate"),
    cell: ({ row }) => `${row.getValue("accessEndDate")}`,
  },
  {
    accessorKey: "isCurrentlyActive",
    header: t("messages.access.active"),
    cell: ({ row }) => {
      const isCurrentlyActive = row.getValue("isCurrentlyActive")
      return h(UCheckbox, {
        defaultValue:isCurrentlyActive,
        disabled:true,
      },)
    },
  },
];



onMounted(async () => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"), { replace: true });
    return;
  }

  await refresh();

  loading.value = false;
});
</script>

<template>
  <h2 class="mb-4 text-2xl font-semibold">{{ t('messages.account.access') }}</h2>
  <UTable
    :loading="loading"
    sticky
    :data="tableData"
    :columns="columns"
    :caption="t('messages.account.access')"
    class="max-h-[312px] flex-1"
  />
</template>

<style lang="css" scoped></style>
