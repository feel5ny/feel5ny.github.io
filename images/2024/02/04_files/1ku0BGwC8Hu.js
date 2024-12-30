;/*FB_PKG_DELIM*/

__d("LSTruncateQuietTime",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1],c=[];return b.sequence([function(a){return b.forEach(b.db.table(317).fetch(),function(a){return a["delete"]()})},function(a){return b.resolve(c)}])}a.__sproc_name__="LSOmnistoreSettingsTruncateQuietTimeStoredProcedure";a.__tables__=["msgr_quiet_time"];e.exports=a}),null);