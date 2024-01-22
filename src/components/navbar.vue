<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">Movary</a>
      <div class="btn-group">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#logPlayModal" style="border-color: #9d9d9d">Add movie</button>
        <button type="button" class="btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false" style="border-color: #9d9d9d">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>Dashboard</li>
          <li>History</li>
          <li>Watchlist</li>
          <li>All Movies</li>
          <li>Top Actors</li>
          <li>Top Directors</li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <div class="form-check form-switch" style="margin-left: 1rem">
            <input id="darkModeInput" class="form-check-input" type="checkbox" role="switch" />
            <label class="form-check-label" for="darkModeInput">Dark Mode</label>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <hr id="darkModeNavHr" style="margin: 0" />
</template>
