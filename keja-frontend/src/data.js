export const LISTINGS = []

export const CITIES = [
  { name: "Nairobi",   count: 9,  img: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=400&q=60" },
  { name: "Mombasa",   count: 4,  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60" },
  { name: "Kisumu",    count: 3,  img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=60" },
  { name: "Nakuru",    count: 3,  img: "https://images.unsplash.com/photo-1591086520060-01adaa6b04bc?w=400&q=60" },
  { name: "Eldoret",   count: 3,  img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=60" },
  { name: "Thika",     count: 2,  img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=60" },
  { name: "Nyeri",     count: 2,  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=60" },
  { name: "Kisii",     count: 2,  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=60" },
  { name: "Machakos",  count: 2,  img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=60" },
  { name: "Meru",      count: 2,  img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=60" },
  { name: "Malindi",   count: 1,  img: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=60" },
  { name: "Naivasha",  count: 1,  img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=60" },
  { name: "Kakamega",  count: 1,  img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&q=60" },
  { name: "Kericho",   count: 1,  img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=60" },
]

export const KENYAN_CITIES = [
  "All Cities",
  "Nairobi","Mombasa","Kisumu","Nakuru","Eldoret",
  "Thika","Nyeri","Kisii","Machakos","Meru",
  "Malindi","Naivasha","Kakamega","Kericho",
  "Garissa","Embu","Kitale","Lamu","Nanyuki","Athi River",
]

export const TYPES = ["All Types","Apartment","Studio","Townhouse","Bedsitter","Villa","Maisonette","Bungalow"]

export const AMENITY_ICONS = {
  WiFi: "📶", Parking: "🚗", Security: "🔒", Gym: "💪",
  Pool: "🏊", Garden: "🌿", Generator: "⚡", Borehole: "💧",
  CCTV: "📷", Water: "🚿", DSQ: "🏠",
}

export const TAG_COLORS = {
  Featured: "#C4522A", New: "#2D6A4F", Luxury: "#7B2D8B",
  Budget: "#1565C0", Premium: "#B7791F",
}

export const CITY_AREAS = {
  "Nairobi": [
    "Westlands","Kilimani","Karen","Lavington","Muthaiga","Runda","Gigiri",
    "Spring Valley","Kileleshwa","Parklands","Upperhill","Hurlingham",
    "Kasarani","Ruaka","Ruaraka","Kahawa","Zimmerman","Mirema","Ridgeways",
    "South B","South C","Embakasi","Donholm","Buru Buru","Umoja",
    "Kayole","Pipeline","Kariobangi","Eastleigh","Githurai",
    "Rongai","Ngong Road","Mlolongo","Athi River","Syokimau",
    "Thika Road","Kikuyu","Tigoni","CBD","Other"
  ],
  "Mombasa": [
    "Nyali","Bamburi","Mtwapa","Shanzu","Bombolulu","Mkomani",
    "Tudor","Likoni","Changamwe","Kisauni","Mikindani",
    "Old Town","CBD","Other"
  ],
  "Kisumu": [
    "Milimani","Kondele","Mamboleo","Nyalenda","Obunga",
    "Tom Mboya","Manyatta","Kolwa","Kibuye","Migosi",
    "Lolwe","CBD","Other"
  ],
  "Nakuru": [
    "Section 58","Milimani","London","Lanet","Bondeni",
    "Kivumbini","Flamingo","Ngata","Racecourse","Free Area",
    "Nakuru East","Pipeline","CBD","Other"
  ],
  "Eldoret": [
    "Elgon View","Langas","Town Centre","Huruma","Kapsoya",
    "Annex","Pioneer","Munyaka","West Indies","Maili Nne",
    "Kimumu","Uganda Road","Chepkoilel","CBD","Other"
  ],
  "Thika": [
    "Makongeni","Landless","Biashara","Stadium","Gatuanyaga",
    "Kiandutu","Kamenu","Section 9","CBD","Other"
  ],
  "Nyeri": [
    "Ruring'u","Kamakwa","King'ong'o","Karatina","Othaya",
    "Mukurweini","CBD","Other"
  ],
  "Kisii": [
    "Town Centre","Suneka","Daraja Mbili","Nyanchwa",
    "Keumbu","Kiogoro","Onjiko","CBD","Other"
  ],
  "Machakos": [
    "Town Centre","Athi River","Mlolongo","Syokimau",
    "Katani","Tala","Kangundo","CBD","Other"
  ],
  "Meru": [
    "Town Centre","Makutano","Nkubu","Timau",
    "Maua","Laare","Githongo","CBD","Other"
  ],
  "Malindi": [
    "Town Centre","Shella","Watamu","Casuarina",
    "Silversands","Muyeye","Other"
  ],
  "Naivasha": [
    "Town Centre","Kongoni","Karati","Lake View",
    "Hell Gate Area","Sulmac","Mirera","Other"
  ],
  "Kakamega": [
    "Town Centre","Milimani","Amalemba","Shieywe",
    "Mumias Road","Bukhungu","Other"
  ],
  "Kericho": [
    "Town Centre","Kapkugerwet","Litein","Londiani","Other"
  ],
  "Garissa": ["Town Centre","Iftin","Bulla Punda","Other"],
  "Embu":    ["Town Centre","Kirimari","Runyenjes","Other"],
  "Kitale":  ["Town Centre","Milimani","Bidii","Other"],
  "Lamu":    ["Lamu Town","Shela","Manda","Other"],
  "Nanyuki": ["Town Centre","Nanyuki Airbase Area","Other"],
  "Muranga": ["Town Centre","Kenol","Makuyu","Other"],
  "Voi":     ["Town Centre","Other"],
  "Kilifi":  ["Town Centre","Bofa","Mtwapa","Other"],
  "Bungoma": ["Town Centre","Musikoma","Other"],
  "Busia":   ["Town Centre","Other"],
  "Homa Bay":["Town Centre","Kendu Bay","Other"],
  "Migori":  ["Town Centre","Rongo","Other"],
  "Bomet":   ["Town Centre","Sotik","Other"],
  "Isiolo":  ["Town Centre","Other"],
  "Kiambu":  ["Kiambu Town","Limuru","Ruiru","Kikuyu","Thika","Other"],
  "Kajiado": ["Ngong","Ongata Rongai","Kitengela","Namanga","Other"],
  "Makueni": ["Wote","Emali","Sultan Hamud","Other"],
  "Other":   ["Other"]
}