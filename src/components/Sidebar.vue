<template>

<aside class="sidebar">

  <h3>Categorías</h3>

  <ul>

    <li>🍔 Hamburguesas</li>
    <li>🍗 Pollo</li>
    <li>🌭 Hotdogs</li>
    <li>🍟 Acompañamientos</li>
    <li>🥤 Bebidas</li>

  </ul>

  <div class="promo">

    <h4>Promo del día</h4>

    <p>
      Combo Burger + Papas + Gaseosa
    </p>

    <span>$24.900</span>

  </div>

</aside>

</template>

<script>

export default {

  name:'AppSidebar'

}

</script>

<style scoped>

.sidebar{

  width:250px;
  min-width:250px;

  background:white;

  padding:25px;

  border-radius:12px;

  border:1px solid #ddd;

}

.sidebar h3{

  margin-bottom:20px;

  color:#222;

}

.sidebar ul{

  list-style:none;

}

.sidebar li{

  padding:14px 0;

  border-bottom:1px solid #eee;

  color:#555;

  cursor:pointer;

  transition:0.2s;

}

.sidebar li:hover{

  color:#f77f00;

}

.promo{

  margin-top:30px;

  background:#fff3e6;

  padding:20px;

  border-radius:10px;

}

.promo h4{

  margin-bottom:10px;

}

.promo p{

  color:#555;

  margin-bottom:10px;

}

.promo span{

  color:#f77f00;

  font-size:26px;

  font-weight:bold;

}

</style>