export const LISTINGS = [
  // ── NAIROBI ──────────────────────────────────────────────────────────────
  { id: 1,  title: "Modern 2BR Apartment", city: "Nairobi", location: "Westlands, Nairobi", price: 35000, beds: 2, baths: 1, sqft: 900,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80", amenities: ["WiFi","Parking","Security","Gym"], available: true,  rating: 4.8, reviews: 24, contactPhone: "0712345678", contactName: "Peter Njoroge",  landlord: "Peter Njoroge",  desc: "Spacious modern apartment in the heart of Westlands. Minutes from Sarit Centre and top restaurants. Fully furnished with high-speed fibre internet." },
  { id: 2,  title: "Cozy Studio in Kilimani", city: "Nairobi", location: "Kilimani, Nairobi", price: 22000, beds: 1, baths: 1, sqft: 500,  type: "Studio",     tag: "New",      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80", amenities: ["WiFi","Security","CCTV"], available: true,  rating: 4.5, reviews: 11, contactPhone: "0723456789", contactName: "Grace Wanjiku",  landlord: "Grace Wanjiku",  desc: "Perfect starter apartment for a professional. Walking distance to Valley Arcade and Yaya Centre. Reliable water and electricity." },
  { id: 3,  title: "Spacious 3BR Townhouse", city: "Nairobi", location: "Karen, Nairobi", price: 85000, beds: 3, baths: 2, sqft: 1800, type: "Townhouse",  tag: "Luxury",   img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80", amenities: ["WiFi","Parking","Garden","Borehole","Generator"], available: true,  rating: 4.9, reviews: 37, contactPhone: "0734567890", contactName: "David Kamau",    landlord: "David Kamau",    desc: "Elegant townhouse set in a leafy Karen compound. Large garden, DSQ included, ample parking. Ideal for families relocating to Nairobi." },
  { id: 4,  title: "Affordable 1BR Bedsitter", city: "Nairobi", location: "Kasarani, Nairobi", price: 9500,  beds: 1, baths: 1, sqft: 300,  type: "Bedsitter",  tag: "Budget",   img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80", amenities: ["Security","Water"], available: true,  rating: 4.1, reviews: 8,  contactPhone: "0745678901", contactName: "Mary Achieng",   landlord: "Mary Achieng",   desc: "Clean, affordable bedsitter near Kasarani Stadium and TRM Mall. Good public transport access. Suitable for students and young professionals." },
  { id: 5,  title: "Executive 4BR Villa", city: "Nairobi", location: "Muthaiga, Nairobi", price: 180000, beds: 4, baths: 3, sqft: 3200, type: "Villa",      tag: "Premium",  img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80", amenities: ["WiFi","Pool","Garden","Generator","Security","Parking"], available: false, rating: 5.0, reviews: 15, contactPhone: "0756789012", contactName: "James Mwangi",   landlord: "James Mwangi",   desc: "Prestigious Muthaiga villa with swimming pool, lush garden, and 24-hr security. Fully equipped kitchen, backup generator, and DSQ for staff." },
  { id: 6,  title: "Modern 2BR in Lavington", city: "Nairobi", location: "Lavington, Nairobi", price: 48000, beds: 2, baths: 2, sqft: 1100, type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", amenities: ["WiFi","Gym","Parking","Pool","Security"], available: true,  rating: 4.7, reviews: 19, contactPhone: "0767890123", contactName: "Samuel Odhiambo", landlord: "Samuel Odhiambo", desc: "Stunning apartment in a high-rise complex with rooftop pool. Open-plan living, fitted kitchen, and secure basement parking. Fibre-ready." },
  { id: 7,  title: "Student Bedsitter", city: "Nairobi", location: "Ruaraka, Nairobi", price: 6000,  beds: 1, baths: 1, sqft: 200,  type: "Bedsitter",  tag: "Budget",   img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80", amenities: ["Security","Water","WiFi"], available: true,  rating: 3.9, reviews: 44, contactPhone: "0778901234", contactName: "Ann Muthoni",     landlord: "Ann Muthoni",     desc: "Affordable self-contained room near several universities. Common laundry area, CCTV, and consistent water supply." },
  { id: 8,  title: "3BR Maisonette", city: "Nairobi", location: "Ruaka, Nairobi", price: 55000, beds: 3, baths: 2, sqft: 1400, type: "Maisonette", tag: "New",      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80", amenities: ["Parking","Borehole","Security","WiFi"], available: true,  rating: 4.6, reviews: 6,  contactPhone: "0789012345", contactName: "John Kariuki",    landlord: "John Kariuki",    desc: "Brand-new maisonette in a quiet Ruaka estate. Open kitchen, master en-suite, borehole water, and ample parking." },
  { id: 9,  title: "1BR Along Mombasa Road", city: "Nairobi", location: "Mlolongo, Nairobi", price: 16000, beds: 1, baths: 1, sqft: 450,  type: "Apartment",  tag: null,       img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80", amenities: ["Security","Parking","Water"], available: true,  rating: 4.2, reviews: 13, contactPhone: "0790123456", contactName: "Tom Otieno",      landlord: "Tom Otieno",      desc: "Compact apartment along Mombasa Road corridor. Easy commute to Industrial Area and SGR Terminus. Good value for the location." },

  // ── MOMBASA ──────────────────────────────────────────────────────────────
  { id: 10, title: "Beachside 2BR Apartment", city: "Mombasa", location: "Nyali, Mombasa", price: 40000, beds: 2, baths: 2, sqft: 950,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", amenities: ["WiFi","Parking","Security","Pool"], available: true,  rating: 4.8, reviews: 21, contactPhone: "0711223344", contactName: "Hassan Omar",      landlord: "Hassan Omar",      desc: "Stunning apartment minutes from the beach in Nyali. Sea breeze, modern finishes, and a shared pool. Perfect for coastal living." },
  { id: 11, title: "Cozy Studio in Bamburi", city: "Mombasa", location: "Bamburi, Mombasa", price: 15000, beds: 1, baths: 1, sqft: 400,  type: "Studio",     tag: "Budget",   img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80", amenities: ["Security","Water","WiFi"], available: true,  rating: 4.2, reviews: 9,  contactPhone: "0722334455", contactName: "Fatuma Ali",       landlord: "Fatuma Ali",       desc: "Affordable studio in Bamburi. Close to major shopping centres and public transport. Good water supply and reliable security." },
  { id: 12, title: "3BR House in Tudor", city: "Mombasa", location: "Tudor, Mombasa", price: 35000, beds: 3, baths: 2, sqft: 1200, type: "Bungalow",   tag: "New",      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80", amenities: ["Parking","Borehole","Security","Garden"], available: true,  rating: 4.5, reviews: 7,  contactPhone: "0733445566", contactName: "Mohamed Salim",   landlord: "Mohamed Salim",   desc: "Spacious family home in Tudor with a large compound. Borehole water, good drainage, close to schools and hospitals." },
  { id: 13, title: "Luxury Villa in Nyali", city: "Mombasa", location: "Nyali, Mombasa", price: 120000, beds: 4, baths: 3, sqft: 2800, type: "Villa",      tag: "Luxury",   img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80", amenities: ["WiFi","Pool","Garden","Generator","Security","Parking"], available: true,  rating: 4.9, reviews: 14, contactPhone: "0744556677", contactName: "Amina Rashid",     landlord: "Amina Rashid",     desc: "Premium villa in Nyali with ocean views, private pool, and lush garden. Ideal for executives and families seeking premium coastal living." },

  // ── KISUMU ───────────────────────────────────────────────────────────────
  { id: 14, title: "2BR Apartment in Milimani", city: "Kisumu", location: "Milimani, Kisumu", price: 25000, beds: 2, baths: 1, sqft: 850,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80", amenities: ["WiFi","Parking","Security"], available: true,  rating: 4.6, reviews: 18, contactPhone: "0755667788", contactName: "Otieno Omondi",   landlord: "Otieno Omondi",   desc: "Well-maintained apartment in the upmarket Milimani area. Lake views from the upper floors. Close to Kisumu CBD and major amenities." },
  { id: 15, title: "Budget Bedsitter Kondele", city: "Kisumu", location: "Kondele, Kisumu", price: 5500,  beds: 1, baths: 1, sqft: 220,  type: "Bedsitter",  tag: "Budget",   img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80", amenities: ["Water","Security"], available: true,  rating: 3.8, reviews: 22, contactPhone: "0766778899", contactName: "Akinyi Awuor",     landlord: "Akinyi Awuor",     desc: "Affordable self-contained room in Kondele. Good matatu access to town. Shared compound with reliable water supply." },
  { id: 16, title: "3BR Townhouse Mamboleo", city: "Kisumu", location: "Mamboleo, Kisumu", price: 32000, beds: 3, baths: 2, sqft: 1300, type: "Townhouse",  tag: "New",      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80", amenities: ["Parking","Security","WiFi","Borehole"], available: true,  rating: 4.4, reviews: 5,  contactPhone: "0777889900", contactName: "Ochieng Okello",   landlord: "Ochieng Okello",   desc: "Brand new townhouse in Mamboleo estate. Spacious rooms, fitted kitchen, and a secure compound. Easy access to Kisumu-Kakamega road." },

  // ── NAKURU ───────────────────────────────────────────────────────────────
  { id: 17, title: "2BR Flat in Section 58", city: "Nakuru", location: "Section 58, Nakuru", price: 18000, beds: 2, baths: 1, sqft: 750,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", amenities: ["Parking","Security","Water"], available: true,  rating: 4.3, reviews: 16, contactPhone: "0700112233", contactName: "Kipchoge Rutto",   landlord: "Kipchoge Rutto",   desc: "Clean two-bedroom flat in popular Section 58 estate. Good water supply, ample parking, and reliable security. Close to Nakuru CBD." },
  { id: 18, title: "Studio in Nakuru CBD", city: "Nakuru", location: "CBD, Nakuru", price: 10000, beds: 1, baths: 1, sqft: 350,  type: "Studio",     tag: "Budget",   img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80", amenities: ["WiFi","Security","Water"], available: true,  rating: 4.0, reviews: 11, contactPhone: "0711223300", contactName: "Njeri Waweru",     landlord: "Njeri Waweru",     desc: "Compact studio apartment right in Nakuru CBD. Ideal for working professionals. Walking distance to offices, banks, and markets." },
  { id: 19, title: "4BR Family Home Milimani", city: "Nakuru", location: "Milimani, Nakuru", price: 60000, beds: 4, baths: 2, sqft: 2000, type: "Bungalow",   tag: "Luxury",   img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=80", amenities: ["WiFi","Garden","Parking","Generator","Security"], available: true,  rating: 4.7, reviews: 8,  contactPhone: "0722334400", contactName: "Susan Chebet",     landlord: "Susan Chebet",     desc: "Spacious family bungalow in Milimani with a large garden. Mature trees, large veranda, and secure perimeter wall. A peaceful home." },

  // ── ELDORET ──────────────────────────────────────────────────────────────
  { id: 20, title: "2BR Apartment Elgon View", city: "Eldoret", location: "Elgon View, Eldoret", price: 20000, beds: 2, baths: 1, sqft: 800,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80", amenities: ["WiFi","Parking","Security"], available: true,  rating: 4.5, reviews: 14, contactPhone: "0733445500", contactName: "Kipkoech Sang",    landlord: "Kipkoech Sang",    desc: "Modern apartment in the leafy Elgon View suburb. Close to major schools, hospitals, and shopping. Quiet neighbourhood, ideal for families." },
  { id: 21, title: "Bedsitter Near MTRH", city: "Eldoret", location: "Town, Eldoret", price: 7000,  beds: 1, baths: 1, sqft: 250,  type: "Bedsitter",  tag: "Budget",   img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80", amenities: ["Water","Security"], available: true,  rating: 4.0, reviews: 19, contactPhone: "0744556600", contactName: "Cherotich Kemboi",  landlord: "Cherotich Kemboi",  desc: "Affordable bedsitter near Moi Teaching and Referral Hospital. Good for medical students and hospital staff. Reliable water supply." },
  { id: 22, title: "3BR House Langas Estate", city: "Eldoret", location: "Langas, Eldoret", price: 28000, beds: 3, baths: 2, sqft: 1100, type: "Bungalow",   tag: "New",      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80", amenities: ["Parking","Security","Borehole","Garden"], available: true,  rating: 4.4, reviews: 6,  contactPhone: "0755667700", contactName: "Rotich Biwott",    landlord: "Rotich Biwott",    desc: "Newly built family home in Langas estate. Three spacious bedrooms, fitted kitchen, and a secure compound. Borehole water." },

  // ── THIKA ────────────────────────────────────────────────────────────────
  { id: 23, title: "2BR in Makongeni", city: "Thika", location: "Makongeni, Thika", price: 15000, beds: 2, baths: 1, sqft: 700,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", amenities: ["Water","Security","Parking"], available: true,  rating: 4.1, reviews: 10, contactPhone: "0700223344", contactName: "Wambua Mutua",     landlord: "Wambua Mutua",     desc: "Affordable two-bedroom flat in Makongeni. Close to Thika Superhighway, easy commute to Nairobi. Good water and security." },
  { id: 24, title: "Studio near Blue Post", city: "Thika", location: "Town, Thika", price: 8000,  beds: 1, baths: 1, sqft: 300,  type: "Studio",     tag: null,       img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80", amenities: ["Water","Security"], available: true,  rating: 3.9, reviews: 7,  contactPhone: "0711334455", contactName: "Kinyua Nganga",    landlord: "Kinyua Nganga",    desc: "Simple self-contained studio in Thika town. Walking distance to Thika market and bus terminus. Suitable for single working professionals." },

  // ── NYERI ────────────────────────────────────────────────────────────────
  { id: 25, title: "3BR Home in Ruring'u", city: "Nyeri", location: "Ruring'u, Nyeri", price: 22000, beds: 3, baths: 2, sqft: 1200, type: "Bungalow",   tag: "Featured", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80", amenities: ["Garden","Parking","Security","Borehole"], available: true,  rating: 4.5, reviews: 9,  contactPhone: "0722445566", contactName: "Kamau Gichuki",    landlord: "Kamau Gichuki",    desc: "Charming family home in a quiet Nyeri suburb. Cool climate, large garden, and mountain views. Close to good schools and hospitals." },
  { id: 26, title: "1BR Flat Nyeri CBD", city: "Nyeri", location: "CBD, Nyeri", price: 9000,  beds: 1, baths: 1, sqft: 400,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80", amenities: ["Water","Security"], available: true,  rating: 4.0, reviews: 12, contactPhone: "0733556677", contactName: "Wanjiru Mwangi",   landlord: "Wanjiru Mwangi",   desc: "Affordable one-bedroom flat in Nyeri CBD. Easy access to county offices, markets, and public transport." },

  // ── KISII ────────────────────────────────────────────────────────────────
  { id: 27, title: "2BR Apartment Kisii Town", city: "Kisii", location: "Town, Kisii", price: 14000, beds: 2, baths: 1, sqft: 680,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80", amenities: ["Water","Security","Parking"], available: true,  rating: 4.2, reviews: 8,  contactPhone: "0744667788", contactName: "Moraa Nyamweya",   landlord: "Moraa Nyamweya",   desc: "Clean and affordable two-bedroom apartment in Kisii town. Walking distance to the market and matatu stage." },
  { id: 28, title: "3BR House Suneka Road", city: "Kisii", location: "Suneka, Kisii", price: 20000, beds: 3, baths: 2, sqft: 1100, type: "Bungalow",   tag: "New",      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80", amenities: ["Garden","Parking","Security","Borehole"], available: true,  rating: 4.4, reviews: 4,  contactPhone: "0755778899", contactName: "Omari Bosire",     landlord: "Omari Bosire",     desc: "New three-bedroom bungalow along Suneka road. Large compound, borehole water, and a kitchen garden. Peaceful neighbourhood." },

  // ── MACHAKOS ─────────────────────────────────────────────────────────────
  { id: 29, title: "2BR Flat Machakos Town", city: "Machakos", location: "Town, Machakos", price: 13000, beds: 2, baths: 1, sqft: 650,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80", amenities: ["Water","Security","Parking"], available: true,  rating: 4.1, reviews: 6,  contactPhone: "0766889900", contactName: "Mutiso Kioko",     landlord: "Mutiso Kioko",     desc: "Affordable flat in Machakos town. Close to county government offices and the famous Machakos People's Park." },
  { id: 30, title: "4BR Home Mlolongo", city: "Machakos", location: "Athi River, Machakos", price: 38000, beds: 4, baths: 2, sqft: 1600, type: "Maisonette", tag: "Featured", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80", amenities: ["WiFi","Parking","Security","Generator"], available: true,  rating: 4.6, reviews: 11, contactPhone: "0777990011", contactName: "Kyalo Mwenda",     landlord: "Kyalo Mwenda",     desc: "Spacious maisonette in Athi River. Quick access to Nairobi via SGR and Mombasa Road. Ideal for families working in EPZ or Nairobi." },

  // ── MERU ─────────────────────────────────────────────────────────────────
  { id: 31, title: "2BR Flat Meru Town", city: "Meru", location: "Town, Meru", price: 12000, beds: 2, baths: 1, sqft: 600,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80", amenities: ["Water","Security","Parking"], available: true,  rating: 4.0, reviews: 7,  contactPhone: "0700334455", contactName: "Mutuma Kithure",   landlord: "Mutuma Kithure",   desc: "Clean and affordable flat in Meru town. Close to Meru market, county hospital, and town centre. Reliable water and good security." },
  { id: 32, title: "3BR Home Makutano", city: "Meru", location: "Makutano, Meru", price: 25000, beds: 3, baths: 2, sqft: 1150, type: "Bungalow",   tag: "New",      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80", amenities: ["Garden","Parking","Borehole","Security"], available: true,  rating: 4.5, reviews: 5,  contactPhone: "0711445566", contactName: "Karimi Mugambi",   landlord: "Karimi Mugambi",   desc: "New bungalow in Makutano with cool Mount Kenya views. Large garden, borehole water, and ample parking. Very peaceful setting." },

  // ── MALINDI ──────────────────────────────────────────────────────────────
  { id: 33, title: "2BR Beach Apartment", city: "Malindi", location: "Town, Malindi", price: 28000, beds: 2, baths: 2, sqft: 900,  type: "Apartment",  tag: "Featured", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", amenities: ["WiFi","Pool","Security","Parking"], available: true,  rating: 4.7, reviews: 16, contactPhone: "0722556677", contactName: "Shariff Abdalla",  landlord: "Shariff Abdalla",  desc: "Beautiful apartment near Malindi beach. Shared pool, sea breeze, and stunning sunsets. Great for holiday or long-term coastal living." },

  // ── NAIVASHA ─────────────────────────────────────────────────────────────
  { id: 34, title: "3BR Home Naivasha", city: "Naivasha", location: "Town, Naivasha", price: 24000, beds: 3, baths: 2, sqft: 1100, type: "Bungalow",   tag: "New",      img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=80", amenities: ["Garden","Parking","Security","Borehole"], available: true,  rating: 4.4, reviews: 8,  contactPhone: "0733667788", contactName: "Njuguna Kamau",    landlord: "Njuguna Kamau",    desc: "Tranquil family home in Naivasha. Close to Lake Naivasha, flower farms, and Longonot. Ideal for those working in the Rift Valley region." },

  // ── KAKAMEGA ─────────────────────────────────────────────────────────────
  { id: 35, title: "2BR Flat Kakamega", city: "Kakamega", location: "Town, Kakamega", price: 12000, beds: 2, baths: 1, sqft: 620,  type: "Apartment",  tag: "Budget",   img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", amenities: ["Water","Security","Parking"], available: true,  rating: 4.1, reviews: 9,  contactPhone: "0744778899", contactName: "Wekesa Wafula",    landlord: "Wekesa Wafula",    desc: "Affordable two-bedroom flat in Kakamega town. Close to Kakamega High School, county offices, and the famous Kakamega Forest." },

  // ── KERICHO ──────────────────────────────────────────────────────────────
  { id: 36, title: "3BR Tea Country Home", city: "Kericho", location: "Town, Kericho", price: 20000, beds: 3, baths: 2, sqft: 1200, type: "Bungalow",   tag: "Featured", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80", amenities: ["Garden","Parking","Security","Borehole"], available: true,  rating: 4.6, reviews: 7,  contactPhone: "0755889900", contactName: "Chepkwony Kirui",  landlord: "Chepkwony Kirui",  desc: "Beautiful home in the heart of Kenya's tea country. Cool climate, lush greenery, and a large garden. Close to Kericho town and amenities." },
]

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