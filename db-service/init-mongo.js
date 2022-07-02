db.createUser({
    use: 'admin',
    pwd: 'donatien',
    roles: [
        {
            role: 'readWrite',
            db: 'voting-mern'
        }
    ]
})