// mockApi.js
export function getImages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // Wedding (15 images)
        { id: 1, url: 'https://picsum.photos/200/300?random=1', category: 'wedding', title: 'Wedding Ceremony' },
        { id: 2, url: 'https://picsum.photos/200/300?random=2', category: 'wedding', title: 'Bride and Groom' },
        { id: 3, url: 'https://picsum.photos/200/300?random=3', category: 'wedding', title: 'First Dance' },
        { id: 4, url: 'https://picsum.photos/200/300?random=4', category: 'wedding', title: 'Wedding Vows' },
        { id: 5, url: 'https://picsum.photos/200/300?random=5', category: 'wedding', title: 'Bouquet Toss' },
        { id: 6, url: 'https://picsum.photos/200/300?random=6', category: 'wedding', title: 'Wedding Cake' },
        { id: 7, url: 'https://picsum.photos/200/300?random=7', category: 'wedding', title: 'Groom Portrait' },
        { id: 8, url: 'https://picsum.photos/200/300?random=8', category: 'wedding', title: 'Bridal Party' },
        { id: 9, url: 'https://picsum.photos/200/300?random=9', category: 'wedding', title: 'Ring Exchange' },
        { id: 10, url: 'https://picsum.photos/200/300?random=10', category: 'wedding', title: 'Outdoor Ceremony' },
        { id: 11, url: 'https://picsum.photos/200/300?random=11', category: 'wedding', title: 'Wedding Sunset' },
        { id: 12, url: 'https://picsum.photos/200/300?random=12', category: 'wedding', title: 'Couple Portrait' },
        { id: 13, url: 'https://picsum.photos/200/300?random=13', category: 'wedding', title: 'Flower Girls' },
        { id: 14, url: 'https://picsum.photos/200/300?random=14', category: 'wedding', title: 'Reception Dance' },
        { id: 15, url: 'https://picsum.photos/200/300?random=15', category: 'wedding', title: 'Wedding Toast' },

        // Party (12 images)
        { id: 16, url: 'https://picsum.photos/200/300?random=16', category: 'party', title: 'Birthday Celebration' },
        { id: 17, url: 'https://picsum.photos/200/300?random=17', category: 'party', title: 'Dance Floor' },
        { id: 18, url: 'https://picsum.photos/200/300?random=18', category: 'party', title: 'Party Lights' },
        { id: 19, url: 'https://picsum.photos/200/300?random=19', category: 'party', title: 'Cake Cutting' },
        { id: 20, url: 'https://picsum.photos/200/300?random=20', category: 'party', title: 'Group Laugh' },
        { id: 21, url: 'https://picsum.photos/200/300?random=21', category: 'party', title: 'DJ Booth' },
        { id: 22, url: 'https://picsum.photos/200/300?random=22', category: 'party', title: 'Confetti Drop' },
        { id: 23, url: 'https://picsum.photos/200/300?random=23', category: 'party', title: 'Party Decor' },
        { id: 24, url: 'https://picsum.photos/200/300?random=24', category: 'party', title: 'Friends Dancing' },
        { id: 25, url: 'https://picsum.photos/200/300?random=25', category: 'party', title: 'Toast Moment' },
        { id: 26, url: 'https://picsum.photos/200/300?random=26', category: 'party', title: 'Balloon Arch' },
        { id: 27, url: 'https://picsum.photos/200/300?random=27', category: 'party', title: 'Party Smiles' },

        // Portrait (12 images)
        { id: 28, url: 'https://picsum.photos/200/300?random=28', category: 'portrait', title: 'Family Portrait' },
        { id: 29, url: 'https://picsum.photos/200/300?random=29', category: 'portrait', title: 'Child Smile' },
        { id: 30, url: 'https://picsum.photos/200/300?random=30', category: 'portrait', title: 'Senior Portrait' },
        { id: 31, url: 'https://picsum.photos/200/300?random=31', category: 'portrait', title: 'Candid Moment' },
        { id: 32, url: 'https://picsum.photos/200/300?random=32', category: 'portrait', title: 'Outdoor Portrait' },
        { id: 33, url: 'https://picsum.photos/200/300?random=33', category: 'portrait', title: 'Siblings Together' },
        { id: 34, url: 'https://picsum.photos/200/300?random=34', category: 'portrait', title: 'Pet Portrait' },
        { id: 35, url: 'https://picsum.photos/200/300?random=35', category: 'portrait', title: 'Couple Shot' },
        { id: 36, url: 'https://picsum.photos/200/300?random=36', category: 'portrait', title: 'Studio Portrait' },
        { id: 37, url: 'https://picsum.photos/200/300?random=37', category: 'portrait', title: 'Laughing Child' },
        { id: 38, url: 'https://picsum.photos/200/300?random=38', category: 'portrait', title: 'Golden Hour Shot' },
        { id: 39, url: 'https://picsum.photos/200/300?random=39', category: 'portrait', title: 'Close-Up Portrait' },

        // Commercial (11 images)
        { id: 40, url: 'https://picsum.photos/200/300?random=40', category: 'commercial', title: 'Product Shot' },
        { id: 41, url: 'https://picsum.photos/200/300?random=41', category: 'commercial', title: 'Office Team' },
        { id: 42, url: 'https://picsum.photos/200/300?random=42', category: 'commercial', title: 'Restaurant Interior' },
        { id: 43, url: 'https://picsum.photos/200/300?random=43', category: 'commercial', title: 'Fashion Ad' },
        { id: 44, url: 'https://picsum.photos/200/300?random=44', category: 'commercial', title: 'Storefront' },
        { id: 45, url: 'https://picsum.photos/200/300?random=45', category: 'commercial', title: 'Food Photography' },
        { id: 46, url: 'https://picsum.photos/200/300?random=46', category: 'commercial', title: 'Corporate Event' },
        { id: 47, url: 'https://picsum.photos/200/300?random=47', category: 'commercial', title: 'Brand Campaign' },
        { id: 48, url: 'https://picsum.photos/200/300?random=48', category: 'commercial', title: 'Studio Product' },
        { id: 49, url: 'https://picsum.photos/200/300?random=49', category: 'commercial', title: 'Business Portrait' },
        { id: 50, url: 'https://picsum.photos/200/300?random=50', category: 'commercial', title: 'Event Booth' },
      ]);
    }, 500); // Simulate network delay
  });
}
