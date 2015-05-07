function trimFields(fieldArray)	{
	for (i=0;i<fieldArray.length;i++)	{
		var buffer=getComponent(fieldArray[i]).getValue();
		buffer=@Trim(buffer);
		getComponent(fieldArray[i]).setValue(buffer);
	}
}

function redirectToCurrentDocument( switchMode ){
	if( typeof currentDocument === 'undefined' ){ return; }
	// Gets the name of the XPage. E.g. /Person.xsp
	var page = view.getPageName();

	// Gets the unid of the current document
	var unid = currentDocument.getDocument().getUniversalID();

	// Sets/changes the action according according to the mode the document is in
	var isEditable = currentDocument.isEditable();
	if( switchMode ){ isEditable = !isEditable; } // false -> true / true -> false
	var action = ( isEditable ) ? 'editDocument' : 'openDocument';

	// Open the current document via a get request
	context.redirectToPage( page + '?documentId=' + unid + '&action=' + action );
} 

function addLog(value)	{	
	var logDoc:NotesDocument=database.createDocument();
	logDoc.replaceItemValue("form","logForm");
	logDoc.replaceItemValue("log",value)
	logDoc.save();
}

/*
*@Purpose:	Function to redirect to home page when a normal non admin user 
attempts to open an Admin Page through url directly
@Author:	Karthikeyan A
@Created:	21-Sep-2010 
*/
function redirectToHomeIfNotAdminUser()	{
	//check if the user has admin role. If yes proceed else redirect to home page
	var acl:NotesACL= database.getACL();
	var entry:NotesACLEntry = acl.getEntry(session.getEffectiveUserName())
	if (entry==null)	{
		entry = acl.getEntry(session.getEffectiveUserName())
	}
  
	if (entry==null)	{
		return false;
	}

	if (!entry.isRoleEnabled("Admin")){
		context.redirectToPage("xpParrywareRoca.xsp")
	}	
}