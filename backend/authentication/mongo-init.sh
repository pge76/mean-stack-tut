mongo -- "$MONGO_DB" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    var user = '$MONGO_DB_USERNAME';
    var passwd = '$MONGO_DB_PASSWORD';
    db.createUser( { user: user, pwd: passwd, roles: ["readWrite"] } );
EOF
