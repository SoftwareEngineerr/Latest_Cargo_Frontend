const remarks = [
    {name:'Excellent'},
    {name:'Very Good'},
    {name:'Good'},
    {name: 'Average'},
    {name:'Poover'}
];

export const UserInterFace = {
    registration:{
        form:[
            // {data:'Admin Details', feildtype:'label' , lg: 12 , md: 12, sm: 12, xs: 12},

            {data:'Person Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Person Name', type: 'text', required: true, name: 'superUser', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
           
            {data:'Business Name', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Business Name', required:true, type: 'text', name: 'businessName', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},
           
            {data:'Phone Number', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Phone Number', required:true, type: 'number', name: 'superPhoneNumber', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},
            
            {data:'Password', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Password', required:true, type: 'password', name: 'superPassword', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},

            {data:'Email', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Email', required:true, type: 'text', name: 'superEmail', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},
            
            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Address', required:true, type: 'text', name: 'superAddress', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},
             
            ],
        
        btnTitle:'Register',
        title:'Kandahar POS',
        description:'Kandahar POS'
    },
    activation:{
        form: [

            {data:'License Key', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'License Key', required:true, type: 'number', name: 'otp', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'en'},

        ],
        btnTitle:'Activate',
        title:'Kandahar POS',
        description:'Kandahar POS'
    },
    
    Contact:{
        menuitems:[
            {
                name:'Zabul Branch',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/1',
            },
            {
                name:'حکيم الامت دارالعلوم (دوهمه څانګه)',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/2',
            },
            {
                name:'حکيم الامت دارالحفاظ',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/3',
            },
            {
                name:'Kandahar Branch',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/4',
            },
            {
                name:'Kabul Branch',
                logo:'/images/logos/Logo.png',
                Branch:'/Branch/5',
            },

        ]
    },
    Branch:{
        Branchitems:[
            {
                id: 1,
                logo:'/images/logos/Logo.png',
                name:'Zabul Branch',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'zabul@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'Zabul Branch',
            },
           
            {
                id: 4,
                logo:'/images/logos/Logo.png',
                name:'Kandahar Branch',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'kandahar@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'Kandahar Branch',
            },
            {
                id: 5,
                logo:'/images/logos/Logo.png',
                name:'Kabul Branch',
                location: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54351.3126347577!2d65.70896987781366!3d31.635026613659903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed671baa0e28837%3A0x2759b21c9042aa75!2sKandahar%2C%20Afghanistan!5e0!3m2!1sen!2s!4v1708766806619!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                Result: '',
                Admin: 'location',
                email: 'kabul@gmail.com',
                whatsapp: '0702387978',
                phone: '0702387978',
                Address:'Kabul Branch',
            },
        ]
    }
}