<template>
  <div class="container">
    <h1 class="title">About us!</h1>
    <h3>Adi Avinun & Nicole Dezoraive</h3>
    <b-carousel
      class="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="500"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594587925/WhatsApp_Image_2020-07-12_at_23.47.35_1_iijjto.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594587929/WhatsApp_Image_2020-07-12_at_23.47.35_iu8t8v.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594587933/WhatsApp_Image_2020-07-12_at_23.47.35_2_o7mjqp.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588315/WhatsApp_Image_2020-07-12_at_23.47.35_7_qvlcsh.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588322/WhatsApp_Image_2020-07-12_at_23.47.35_5_vprj4g.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588326/WhatsApp_Image_2020-07-12_at_23.47.35_4_yu3y4b.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588330/WhatsApp_Image_2020-07-12_at_23.47.35_3_ozlkgl.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588387/WhatsApp_Image_2020-07-12_at_23.56.20_3_cacajr.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588396/WhatsApp_Image_2020-07-12_at_23.56.20_1_sub712.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588400/WhatsApp_Image_2020-07-12_at_23.56.20_ovav3t.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588404/WhatsApp_Image_2020-07-12_at_23.47.35_8_e8lyte.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://res.cloudinary.com/ddmhcwaul/image/upload/v1594588408/WhatsApp_Image_2020-07-12_at_23.57.05_vcxwwl.jpg"
      ></b-carousel-slide>
    </b-carousel>
    <br>
    <br>
    <br>
    <br>
    <p>We hope you enjoyed our website as much as we did making it</p>
  </div>
</template>

<style scoped>
.carousel-1{
   height: 300px;
   width: 500px;
   margin: 0 auto;
}
.container{
    font-family: Impact, Charcoal, sans-serif;

}
</style>
