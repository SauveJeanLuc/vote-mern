db.createUser({
    user: 'admin',
    pwd: 'donatien',
    roles: [
        {
            role: 'readWrite',
            db: 'voting-mern'
        }
    ]
})