import "photoswipe/style.css";

export function useProductLightbox() {
  const { product, selectedVariant, galleryAssets } =
    storeToRefs(useProductStore());

  async function createDataSource(
    galleryAssets: Array<{ id: string; preview: string }>,
    altBase: string,
  ) {
    const promises = galleryAssets.map(async (item, idx) => {
      const img = new window.Image();
      img.src = item.preview;
      await new Promise((resolve) => {
        if (img.complete) return resolve(null);
        img.onload = resolve;
        img.onerror = resolve;
      });

      return {
        src: item.preview,
        width: img.naturalWidth,
        height: img.naturalHeight,
        alt: `${altBase} – Slide ${idx + 1}`,
      };
    });

    return Promise.all(promises);
  }

  const openPhotoSwipe = async (startIndex = 0) => {
    const PhotoSwipe = (await import("photoswipe")).default;
    const altBase =
      selectedVariant.value?.name || product.value?.name || "Product image";
    const dataSource = await createDataSource(galleryAssets.value, altBase);

    const pswp = new PhotoSwipe({
      dataSource,
      index: startIndex,
      showHideAnimationType: "fade",
    });
    pswp.init();
  };

  return { openPhotoSwipe };
}
