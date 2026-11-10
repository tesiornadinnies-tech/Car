import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

const FAVORITES_KEY = 'carfinder-favorites'
const CARS = [
  { id: 'toyota-camry', make: 'Toyota', model: 'Camry', trim: 'XSE · 2.5L Hybrid', year: 2025, price: 34850, mileage: 'New', fuel: 'Hybrid', transmission: 'Automatic', type: 'Sedan', image: 'photo-1621007947382-bb3c3994e3fb', color: 'Pearl White', description: 'Comfortable, refined, and remarkably efficient. The Camry XSE brings confident handling and a thoughtfully finished cabin to every drive.' },
  { id: 'bmw-3-series', make: 'BMW', model: '3 Series', trim: '330i · Sport Line', year: 2025, price: 45900, mileage: 'New', fuel: 'Petrol', transmission: 'Automatic', type: 'Sedan', image: 'photo-1555215695-3004980ad54e', color: 'Mineral Grey', description: 'A driver-focused sport sedan with precise steering, a composed ride, and the technology you need for the everyday.' },
  { id: 'honda-cr-v', make: 'Honda', model: 'CR-V', trim: 'EX-L · AWD', year: 2025, price: 36950, mileage: 'New', fuel: 'Petrol', transmission: 'Automatic', type: 'SUV', image: 'photo-1519641471654-76ce0107ad1b', color: 'Platinum White', description: 'Room for the whole family, useful cargo space, and an easy-to-live-with cabin make the CR-V a versatile companion.' },
  { id: 'porsche-911', make: 'Porsche', model: '911', trim: 'Carrera · 3.0L', year: 2024, price: 120950, mileage: '3,200 mi', fuel: 'Petrol', transmission: 'Automatic', type: 'Coupe', image: 'photo-1503376780353-7e6692767b70', color: 'Chalk', description: 'Iconic proportions meet a twin-turbo flat-six and precise balance. This Carrera makes every open stretch feel special.' },
  { id: 'mercedes-c-class', make: 'Mercedes-Benz', model: 'C-Class', trim: 'C 300 · AMG Line', year: 2025, price: 48950, mileage: 'New', fuel: 'Petrol', transmission: 'Automatic', type: 'Sedan', image: 'photo-1618843479313-40f8afb4b4d8', color: 'Obsidian Black', description: 'A beautifully appointed, quiet cabin and effortless performance give the C-Class its unmistakable sense of occasion.' },
  { id: 'ford-mustang', make: 'Ford', model: 'Mustang', trim: 'GT · 5.0L V8', year: 2024, price: 42720, mileage: '1,850 mi', fuel: 'Petrol', transmission: 'Manual', type: 'Coupe', image: 'photo-1584345604476-8ec5e12e42dd', color: 'Race Red', description: 'A naturally aspirated V8, a proper manual gearbox, and unmistakable Mustang character, ready for the long way home.' },
  { id: 'tesla-model-3', make: 'Tesla', model: 'Model 3', trim: 'Long Range · AWD', year: 2025, price: 42490, mileage: 'New', fuel: 'Electric', transmission: 'Automatic', type: 'Sedan', image: 'photo-1560958089-b8a1929cea89', color: 'Pearl White', description: 'A long-range electric daily driver with instant response, a clean minimalist interior, and over-the-air updates.' },
  { id: 'audi-q5', make: 'Audi', model: 'Q5', trim: 'Premium Plus · quattro', year: 2025, price: 52900, mileage: 'New', fuel: 'Petrol', transmission: 'Automatic', type: 'SUV', image: 'photo-1606664515524-ed2f786a0bd6', color: 'Navarra Blue', description: 'Quiet confidence, Audi quattro traction, and a high-quality interior in a right-sized premium SUV.' },
  { id: 'volvo-xc60', make: 'Volvo', model: 'XC60', trim: 'B5 · Plus', year: 2025, price: 49950, mileage: 'New', fuel: 'Hybrid', transmission: 'Automatic', type: 'SUV', image: 'photo-1511919884226-fd3cad34687c', color: 'Silver Dawn', description: 'Scandinavian design and thoughtful safety features make this mild-hybrid SUV a relaxed place to spend time.' },
  { id: 'mazda-mx-5', make: 'Mazda', model: 'MX-5 Miata', trim: 'Club · 2.0L', year: 2024, price: 33750, mileage: '2,100 mi', fuel: 'Petrol', transmission: 'Manual', type: 'Convertible', image: 'photo-1504215680853-026ed2a45def', color: 'Soul Red', description: 'Light, responsive, and built around the joy of an open top and a great road. The Miata keeps it simple.' },
  { id: 'jeep-wrangler', make: 'Jeep', model: 'Wrangler', trim: 'Sahara · 4x4', year: 2025, price: 51200, mileage: 'New', fuel: 'Petrol', transmission: 'Automatic', type: 'SUV', image: 'photo-1533473359331-0135ef1b58bf', color: 'Sarge Green', description: 'Trail-ready four-wheel drive and removable roof panels bring proper adventure capability to your next trip.' },
  { id: 'hyundai-ioniq-5', make: 'Hyundai', model: 'IONIQ 5', trim: 'SEL · Long Range', year: 2025, price: 46850, mileage: 'New', fuel: 'Electric', transmission: 'Automatic', type: 'SUV', image: 'photo-1593941707882-a5bba14938c7', color: 'Digital Teal', description: 'Distinctive retro-modern design, a spacious flat-floor cabin, and rapid charging make the IONIQ 5 an electric standout.' },
]

const API_MAKES = ['Acura', 'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Nissan', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo']
const API_IMAGES = [
  'photo-1621007947382-bb3c3994e3fb',
  'photo-1555215695-3004980ad54e',
  'photo-1519641471654-76ce0107ad1b',
  'photo-1503376780353-7e6692767b70',
  'photo-1618843479313-40f8afb4b4d8',
  'photo-1584345604476-8ec5e12e42dd',
  'photo-1560958089-b8a1929cea89',
  'photo-1606664515524-ed2f786a0bd6',
  'photo-1511919884226-fd3cad34687c',
  'photo-1504215680853-026ed2a45def',
  'photo-1533473359331-0135ef1b58bf',
  'photo-1593941707882-a5bba14938c7',
]

function makeApiCars(results, existingCars) {
  const existingModels = new Set(existingCars.map((car) => `${car.make.toLowerCase()}|${car.model.toLowerCase()}`))
  const seenModels = new Set(existingModels)
  const addedCars = []

  for (const result of results) {
    if (result.status !== 'fulfilled') continue

    for (const vehicle of result.value) {
      if (typeof vehicle.Model_Name !== 'string' || !vehicle.Model_Name.trim()) continue
      const make = API_MAKES.find((name) => name.toLowerCase() === vehicle.Make_Name?.toLowerCase())
      if (!make) continue

      const model = vehicle.Model_Name.trim()
      const modelKey = `${make.toLowerCase()}|${model.toLowerCase()}`
      if (seenModels.has(modelKey)) continue
      seenModels.add(modelKey)

      const imageIndex = Array.from(`${make} ${model}`).reduce((hash, character) => hash + character.charCodeAt(0), 0) % API_IMAGES.length
      const id = `nhtsa-${make}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      addedCars.push({
        id,
        make,
        model,
        trim: 'NHTSA vehicle model',
        year: 2025,
        price: null,
        mileage: null,
        fuel: null,
        transmission: null,
        type: 'Passenger car',
        image: API_IMAGES[imageIndex],
        color: null,
        source: 'nhtsa',
        description: `${make} ${model} is listed in the NHTSA public vehicle database for model year 2025. Pricing and vehicle specifications are not provided by this API.`,
      })
    }
  }

  return addedCars
}

const formatPrice = (price) => `$${price.toLocaleString('en-US')}`

function readFavorites() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
  } catch (error) {
    console.error('Could not read saved favorites:', error)
    return []
  }
}

function Icon({ name, size = 20, className = '' }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    car: <><path d="m5 17-1 0-1-2 2-6h14l2 6-1 2h-1" /><path d="M5 17h14" /><path d="M5 9l2-4h10l2 4" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" /></>,
    fuel: <><path d="M3 22V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17" /><path d="M3 12h14M7 7h6" /><path d="M17 8h2l2 2v8a2 2 0 0 1-4 0" /></>,
    tune: <><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3" /><path d="M2 14h4m4-6h4m4 8h4" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }

  return (
    <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function Header({ favoriteCount }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="CarFinder home">
          <span className="brand-mark"><Icon name="car" size={23} /></span>
          <span>carfinder<span className="brand-period">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink end to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Discover</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Saved cars <span className="nav-count">{favoriteCount}</span>
          </NavLink>
        </nav>
        <a className="header-cta" href="#inventory">Find your car <Icon name="arrow" size={16} /></a>
      </div>
    </header>
  )
}

function CarCard({ car, isFavorite, onToggleFavorite }) {
  return (
    <article className="car-card">
      <div className="card-image-wrap">
        <Link to={`/car/${car.id}`} className="card-image-link" aria-label={`View ${car.year} ${car.make} ${car.model}`}>
          <img
            className="car-image"
            src={`https://images.unsplash.com/${car.image}?auto=format&fit=crop&w=900&q=82`}
            alt={`${car.year} ${car.make} ${car.model}`}
            loading="lazy"
          />
        </Link>
        <span className="image-label">{car.source === 'nhtsa' ? 'Illustrative photo' : car.mileage === 'New' ? 'Brand new' : 'Pre-owned'}</span>
        <button
          type="button"
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          onClick={() => onToggleFavorite(car.id)}
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${car.make} ${car.model} ${isFavorite ? 'from' : 'to'} favorites`}
          aria-pressed={isFavorite}
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <div className="card-body">
        <div className="card-heading">
          <div>
            <p className="car-make">{car.make} <span>· {car.year}</span></p>
            <h3><Link to={`/car/${car.id}`}>{car.model}</Link></h3>
          </div>
          <span className={`car-price${car.price === null ? ' price-unavailable' : ''}`}>{car.price === null ? 'Price not listed' : formatPrice(car.price)}</span>
        </div>
        <p className="car-trim">{car.trim}</p>
        <div className="car-specs">
          {car.source === 'nhtsa'
            ? <><span>2025 model</span><span>Passenger car</span><span>NHTSA data</span></>
            : <><span>{car.fuel}</span><span>{car.transmission}</span><span>{car.mileage}</span></>}
        </div>
        <Link className="card-details-link" to={`/car/${car.id}`}>View details <Icon name="arrow" size={16} /></Link>
      </div>
    </article>
  )
}

function CarGrid({ cars, favorites, onToggleFavorite }) {
  if (!cars.length) {
    return (
      <div className="empty-results">
        <span className="empty-icon"><Icon name="car" size={28} /></span>
        <h3>No cars found just yet</h3>
        <p>Try a different search or loosen your filters to see more cars.</p>
      </div>
    )
  }

  return (
    <div className="car-grid">
      {cars.map((car) => <CarCard key={car.id} car={car} isFavorite={favorites.includes(car.id)} onToggleFavorite={onToggleFavorite} />)}
    </div>
  )
}

function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null
  const pageNumbers = [...new Set([1, page - 1, page, page + 1, pageCount].filter((pageNumber) => pageNumber >= 1 && pageNumber <= pageCount))].sort((a, b) => a - b)

  return (
    <nav className="pagination" aria-label="Car results pages">
      <button type="button" className="page-arrow" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page">‹</button>
      {pageNumbers.map((pageNumber, index) => (
        <span key={pageNumber} className="pagination-item">
          {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && <span className="pagination-ellipsis" aria-hidden="true">…</span>}
          <button type="button" className={`page-number${pageNumber === page ? ' current' : ''}`} onClick={() => onChange(pageNumber)} aria-current={pageNumber === page ? 'page' : undefined}>{pageNumber}</button>
        </span>
      ))}
      <button type="button" className="page-arrow" onClick={() => onChange(page + 1)} disabled={page === pageCount} aria-label="Next page">›</button>
    </nav>
  )
}

function Inventory({ cars, favorites, onToggleFavorite, initialQuery = '', title = 'Find your next car', description = 'A little less scrolling. A lot more falling in love.', showHero = true, apiStatus, apiMessage, onRetry }) {
  const [query, setQuery] = useState(initialQuery)
  const [make, setMake] = useState('All makes')
  const [type, setType] = useState('All body styles')
  const [sort, setSort] = useState('recommended')
  const [page, setPage] = useState(1)
  const pageSize = 6
  const makeOptions = [...new Set(cars.map((car) => car.make))].sort()
  const typeOptions = [...new Set(cars.map((car) => car.type))].sort()

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const matches = cars.filter((car) => {
      const searchText = [car.make, car.model, car.trim, car.year, car.type, car.fuel].filter(Boolean).join(' ').toLowerCase()
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery)
      return matchesQuery && (make === 'All makes' || car.make === make) && (type === 'All body styles' || car.type === type)
    })
    if (sort === 'price-low' || sort === 'price-high') {
      const direction = sort === 'price-low' ? 1 : -1
      matches.sort((a, b) => {
        if (a.price === null) return b.price === null ? a.model.localeCompare(b.model) : 1
        if (b.price === null) return -1
        return direction * (a.price - b.price)
      })
    }
    if (sort === 'year-new') matches.sort((a, b) => b.year - a.year)
    return matches
  }, [cars, query, make, type, sort])

  const pageCount = Math.ceil(filteredCars.length / pageSize)
  const visibleCars = filteredCars.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      {showHero && (
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE CAR IS HERE</span>
            <h1>Good cars.<br />Great <span>finds.</span></h1>
            <p>Thoughtful picks for the road ahead. Find the car that feels like you.</p>
            <a className="hero-button" href="#inventory">Explore the collection <span>↓</span></a>
            <div className="hero-note"><span className="hero-note-avatars"><i>J</i><i>A</i><i>M</i></span><span>Join <strong>2,400+</strong> happy car finders</span></div>
          </div>
          <div className="hero-photo">
            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=88" alt="A polished car ready for the open road" />
            <div className="photo-caption"><span className="caption-dot" /><span>THE OPEN ROAD LOOKS GOOD ON YOU</span></div>
            <div className="hero-photo-tag"><span>Curated for your next chapter</span><strong>Find the one <Icon name="arrow" size={17} /></strong></div>
          </div>
          <div className="hero-vertical-note">GOOD FINDS, BETTER DRIVES <span>✳</span> SINCE 2025</div>
        </section>
      )}

      <main id="inventory" className={`inventory-section${showHero ? '' : ' inventory-page'}`}>
        <div className="section-topline">
          <div>
            <span className="section-kicker">{showHero ? 'A GOOD PLACE TO START' : 'YOUR PERSONAL SHORTLIST'}</span>
            <h2>{title}</h2>
            <p className="section-description">{description}</p>
          </div>
          <div className="inventory-count"><span className="count-dot" /> {filteredCars.length} cars to explore</div>
        </div>
        {apiMessage && <div className={`api-message ${apiStatus === 'error' ? 'api-error' : ''}`} role={apiStatus === 'error' ? 'alert' : 'status'}>
          {apiStatus === 'loading' && <span className="loading-spinner" aria-hidden="true" />}
          <span>{apiMessage}</span>
          {apiStatus === 'error' && <button type="button" onClick={onRetry}>Try again</button>}
        </div>}
        <div className="filter-bar">
          <label className="search-field">
            <Icon name="search" size={19} />
            <span className="visually-hidden">Search cars</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Try “electric”, “SUV” or a make..." />
            {query && <button type="button" className="clear-search" onClick={() => { setQuery(''); setPage(1) }} aria-label="Clear search"><Icon name="close" size={17} /></button>}
          </label>
          <label className="select-field">
            <Icon name="car" size={17} />
            <span className="visually-hidden">Filter by make</span>
            <select value={make} onChange={(event) => { setMake(event.target.value); setPage(1) }}><option>All makes</option>{makeOptions.map((option) => <option key={option}>{option}</option>)}</select>
          </label>
          <label className="select-field">
            <Icon name="tune" size={17} />
            <span className="visually-hidden">Filter by body style</span>
            <select value={type} onChange={(event) => { setType(event.target.value); setPage(1) }}><option>All body styles</option>{typeOptions.map((option) => <option key={option}>{option}</option>)}</select>
          </label>
          <label className="sort-field"><span>Sort by</span><select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1) }} aria-label="Sort cars"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="year-new">Newest year</option></select></label>
        </div>
        <CarGrid cars={visibleCars} favorites={favorites} onToggleFavorite={onToggleFavorite} />
        {pageCount > 1 && <div className="results-footer"><span>Showing {((page - 1) * pageSize) + 1}–{Math.min(page * pageSize, filteredCars.length)} of {filteredCars.length} cars</span><Pagination page={page} pageCount={pageCount} onChange={setPage} /></div>}
      </main>
      {showHero && <section className="bottom-note"><span>✳</span><p>Not just a car. <strong>Your next favorite thing.</strong></p><span>✳</span></section>}
    </>
  )
}

function DetailPage({ cars, favorites, onToggleFavorite }) {
  const { carId } = useParams()
  const navigate = useNavigate()
  const car = cars.find((item) => item.id === carId)

  if (!car) {
    return <main className="not-found"><span className="section-kicker">ROADBLOCK</span><h1>That car took a different turn.</h1><p>We couldn’t find the car you’re looking for.</p><Link className="hero-button" to="/">Back to discovery <Icon name="arrow" size={16} /></Link></main>
  }

  const isFavorite = favorites.includes(car.id)

  return (
    <main className="detail-page">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Back to cars</button>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img src={`https://images.unsplash.com/${car.image}?auto=format&fit=crop&w=1400&q=88`} alt={`${car.year} ${car.make} ${car.model}`} />
          <span className="image-label">{car.source === 'nhtsa' ? 'Illustrative photo' : car.mileage === 'New' ? 'Brand new' : 'Pre-owned'}</span>
        </div>
        <section className="detail-info">
          <span className="section-kicker">{car.year} · {car.type.toUpperCase()}</span>
          <h1>{car.make}<br /><span>{car.model}</span></h1>
          <p className="detail-trim">{car.trim}{car.color && <> <span>·</span> {car.color}</>}</p>
          <p className="detail-price">{car.price === null ? 'Price not listed' : formatPrice(car.price)}{car.price !== null && <span>est. asking price</span>}</p>
          <p className="detail-description">{car.description}</p>
          <div className="detail-specs">
            <div><span>BODY STYLE</span><strong>{car.type}</strong></div>
            <div><span>POWERTRAIN</span><strong>{car.fuel || 'Not provided'}</strong></div>
            <div><span>TRANSMISSION</span><strong>{car.transmission || 'Not provided'}</strong></div>
            <div><span>MILEAGE</span><strong>{car.mileage || 'Not provided'}</strong></div>
          </div>
          <button type="button" className={`detail-favorite${isFavorite ? ' saved' : ''}`} onClick={() => onToggleFavorite(car.id)}>
            <Icon name="heart" size={19} /> {isFavorite ? 'Saved to your favorites' : 'Save to favorites'}
          </button>
          <p className="detail-disclaimer">{car.source === 'nhtsa' ? 'Model information provided by NHTSA. The photo is illustrative; pricing and specifications are not provided by the API.' : 'Prices and vehicle details are sample listings for demonstration.'}</p>
        </section>
      </div>
      <section className="more-cars"><span className="section-kicker">KEEP EXPLORING</span><h2>More good finds</h2><CarGrid cars={cars.filter((item) => item.id !== car.id).slice(0, 3)} favorites={favorites} onToggleFavorite={onToggleFavorite} /></section>
    </main>
  )
}

function Footer({ apiStatus }) {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" to="/"><span className="brand-mark"><Icon name="car" size={21} /></span><span>carfinder<span className="brand-period">.</span></span></Link>
      <p>Made for the joy of finding your next drive.</p>
      <span className="api-credit"><span className={`api-status-dot ${apiStatus}`} /> Vehicle models by <a href="https://vpic.nhtsa.dot.gov/api/" target="_blank" rel="noreferrer">NHTSA vPIC API</a></span>
    </footer>
  )
}

function App() {
  const [favorites, setFavorites] = useState(readFavorites)
  const [cars, setCars] = useState(CARS)
  const [apiStatus, setApiStatus] = useState('loading')
  const [apiMessage, setApiMessage] = useState('')
  const [apiRetry, setApiRetry] = useState(0)

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Could not save favorites:', error)
    }
  }, [favorites])

  useEffect(() => {
    let active = true

    const controller = new AbortController()

    async function fetchVehicleModels() {
      setApiStatus('loading')
      setApiMessage('Loading 2025 vehicle models from the NHTSA database…')
      try {
        const results = await Promise.allSettled(API_MAKES.map(async (make) => {
          const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/2025/vehicletype/car?format=json`, { signal: controller.signal })
          if (!response.ok) throw new Error(`Vehicle database returned ${response.status} for ${make}`)
          const data = await response.json()
          if (!Array.isArray(data.Results)) throw new Error(`Vehicle database returned an unexpected response for ${make}`)
          return data.Results
        }))

        if (controller.signal.aborted) return

        results.forEach((result, index) => {
          if (result.status === 'rejected') console.error(`Could not load ${API_MAKES[index]} models:`, result.reason)
        })

        const apiCars = makeApiCars(results, CARS)
        const failedMakes = results.filter((result) => result.status === 'rejected').length
        if (active) {
          setCars([...CARS, ...apiCars])
          if (apiCars.length > 0) {
            setApiStatus('success')
            setApiMessage(`Showing ${apiCars.length} additional 2025 vehicle models from the NHTSA database${failedMakes ? ` · ${failedMakes} makes could not be loaded` : ''}. Photos are illustrative; the API does not provide listings or prices.`)
          } else if (failedMakes > 0) {
            setApiStatus('error')
            setApiMessage('NHTSA vehicle models could not be loaded. The original sample-car collection is still ready to browse.')
          } else {
            setApiStatus('success')
            setApiMessage('The NHTSA database is connected. The original car collection is ready to browse.')
          }
        }
      } catch (error) {
        if (controller.signal.aborted) return
        console.error('Could not load vehicle makes:', error)
        if (active) {
          setApiStatus('error')
          setApiMessage('NHTSA vehicle models could not be loaded. The original sample-car collection is still ready to browse.')
        }
      }
    }

    fetchVehicleModels()
    return () => {
      active = false
      controller.abort()
    }
  }, [apiRetry])

  const toggleFavorite = (id) => {
    setFavorites((saved) => saved.includes(id) ? saved.filter((favorite) => favorite !== id) : [...saved, id])
  }

  const favoriteCars = cars.filter((car) => favorites.includes(car.id))

  return (
    <div className="app-shell">
      <Header favoriteCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Inventory cars={cars} favorites={favorites} onToggleFavorite={toggleFavorite} apiStatus={apiStatus} apiMessage={apiMessage} onRetry={() => setApiRetry((attempt) => attempt + 1)} />} />
        <Route path="/favorites" element={<Inventory cars={favoriteCars} favorites={favorites} onToggleFavorite={toggleFavorite} title="Cars you’ve got your eye on" description={favoriteCars.length ? 'Your saved cars, all in one happy little place.' : 'Tap the heart on any car to save it for later.'} showHero={false} />} />
        <Route path="/car/:carId" element={<DetailPage cars={cars} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="*" element={<main className="not-found"><span className="section-kicker">404 · WRONG TURN</span><h1>We can’t find that road.</h1><Link className="hero-button" to="/">Back to discovery <Icon name="arrow" size={16} /></Link></main>} />
      </Routes>
      <Footer apiStatus={apiStatus} />
    </div>
  )
}

export default App
