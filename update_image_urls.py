with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace Hero image
content = content.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuDTFW1n1HLzEFWD2ncyIyFPgsLap7gm4-Wjep9_6trwAMjw3PMVSfxvREj6O713f1uCd2AlN5dlnK796oi0m3Dpw2KjAqB29dPzTvZ433bYXT3LlyG2BlXaS2c6BcuW_5bfK-FQ7crYaNKYT-8u6BKdYTaiC5xrNnyXhsf-Ex2ha0IAp4JaZ6h03DVvaO10do9KBPVCC4nYMzyHzPGCuXhNp8zxh7TSzNzzGuJx5g0X0n5IAO4_2DHEDg', '/images/hero.jpg')

# Replace Project 1 image
content = content.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuCtpkAy2oyNiKxh_0OjitYCsNiaWtraTRcq_FlD-HnP2KOTvfPHP3nBcc54lPWiMkImLGfY-BBQ24Nies8zyV2JigEzG2KjzLIjLMzhSCL_-Fla7yLonCXQ-SPlkFo4gLLSH2ZyBYyvsURUrmtwjyopMcu2q4t63KUlTakWIpLtJBYK7wSovXjWlLq_sVn7VkbsV8I-6XDId5DXT-OGP15_jMlOt9Bd2A4lmfFLZbz49Q17X9XqojMlBA', '/images/project1.jpg')

# Replace Project 2 image
content = content.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuDOhcXwZ0wciEOd5uU6W0PF4_lwDEkuMVDDZMHKTEWjK4fOx8N1EKXDmEdYww2ImP8Ny1YeZEfs7ED-bgoSX2cJky8j6cLFwpvkJkyZwA0evcFC-sjDYe5H_xO9DkJki7wpC0AofSBb0YclnXhEvdHYNCmiGJdles2xIxi57zcauSbooyqNcJRfiUIHIVawt48mYzNxXd9b9fITdnnnGKHBhOwXoI995UaHwvKUs0DQcM0kbOEwbLE_EA', '/images/project2.jpg')

# Replace Project 3 image
content = content.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuAMcDOno6Scgd5BFg9L1qTf-s9OkhsNQjKzxSplYsQ4dyjkTSCNxADoSv-L-g5_GpFrHLVy05sEHznifXdMUuyYB_NFibVDcr2HAUuQ3RNIIL5uwp1swp5yKn44i4sfxNE63dBmkEksnPLhgwUF_MIlXyx7INpDlnOEWnghAZEBASptDMP36TQXK8X99FzbhzZ5iODFCcsaTO5nI-H56PvGpbMNrXLnwbcEyUcXHpUTXSBbIeFSp98h6g', '/images/project3.jpg')

# Replace Project 4 image
content = content.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuCQDOWMTvjW_pesS3iDvSEy0TRijOEhD3H5Okz6qa2Vh1YI62lyMATzJuP50wMFbItQWdtmQKNFDvrGmUPny8tnPL76mEW2jtRIYajWeDZMs36V2LQPEa5yJAhv3KroNLDEZ_MGdUMFo4ZUZcSNFq_WkYA0f6vfJ2sleOrzQt5NWPvSopw5rjzHSAZQGkVL6xo5DRcsJCB-MHDv6RbPqKgRovpaPd6H7hyw5TMpwNokmfiMk_HHomch0g', '/images/project4.jpg')

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated image URLs in page.tsx.")
