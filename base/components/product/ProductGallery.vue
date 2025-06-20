<script setup lang="ts">
const { product, selectedVariant, galleryAssets } =
  storeToRefs(useProductStore());

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}

const { openPhotoSwipe } = useProductLightbox({ select });
</script>

<template>
  <div class="w-full flex-1">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      :items="galleryAssets"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="mx-auto w-full"
      @select="onSelect"
    >
      <NuxtImg
        format="webp"
        class="mx-auto h-[250px] rounded-lg object-contain sm:h-[350px] sm:object-cover"
        :src="item.preview"
        :alt="`${selectedVariant?.name || product?.name || 'Product image'} – Slide ${activeIndex + 1}`"
        :loading="activeIndex === 0 ? 'eager' : 'lazy'"
        :preload="activeIndex === 0"
        sizes="90vw sm:30vw"
        placeholder
        placeholder-class="blur-xl"
        @click="() => openPhotoSwipe(activeIndex)"
      />
    </UCarousel>

    <div class="mx-auto flex max-w-xs justify-between gap-1 pt-4">
      <div
        v-for="(item, index) in galleryAssets"
        :key="item.id"
        class="opacity-25 transition-opacity hover:opacity-100"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <NuxtImg
          format="webp"
          class="h-[45px] w-[45px] rounded-lg object-cover"
          :src="item.preview"
          :alt="`${selectedVariant?.name || product?.name || 'Product image'} – Thumb ${index + 1}`"
          loading="eager"
          preload
          sizes="45px"
          placeholder
          placeholder-class="blur-xl"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
