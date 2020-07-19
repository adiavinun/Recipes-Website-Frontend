<template>
  <div class="container">
    
    <h1 class="title">About us!</h1>
    <h3 style="text-align: center;">Adi Avinun & Nicole Dezoraive</h3>
    <br/>
    <div class="project">
      <h6 class="about">
      We are both third year students in Information Systems and Software
      Engineering at Ben Gurion University. We have been working together for 2
      years, partners in most of the universities projects. We are both hard
      workers, work well in teams, and as an addition, we are best friends. 
      We hope you enjoyed our website as much as we did making it
      <b-icon-emoji-smile></b-icon-emoji-smile>
    </h6>
    <br>
      <h3 style="font-weight:bold;">Take a look at our other projects:</h3>
      <a
        href="https://sise-web-development-environments.github.io/assignment2-adi-nicole/"
        target="_blank"
        >Pacman Game</a
      >
      <br />
      <a
        href="https://sise-web-development-environments.github.io/313957409/"
        target="_blank"
        >Adi's Website</a
      >
      <br />
      <a
        href="https://sise-web-development-environments.github.io/313584294/"
        target="_blank"
        >Nicole's Website</a
      >
    </div>
    <b-carousel
      class="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="500"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333;"
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

    
  </div>
</template>

<script>
import { BIconEmojiSmile } from "bootstrap-vue";

export default {
  components: {
    BIconEmojiSmile,
  },
};
</script>

<style scoped>
.carousel-1 {
  height: 300px;
  width: 500px;
position: absolute;
  right: 180px;}
.container {
  font-family: Impact, Charcoal, sans-serif;
 overflow: hidden;
}
.project {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-weight: bold;
  width: 500px;
  border: 3px solid #2c3e50;
  padding: 5px;
    float: left;

}
.about{
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 18px;
  font-weight: bold;
  width: 480px;
  text-align: center;
}
.title{
    background: url("https://previews.123rf.com/images/romastudio/romastudio1603/romastudio160300234/54088727-healthy-food-background-and-copy-space-studio-photo-of-different-fruits-and-vegetables-on-white-wood.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
}

</style>
