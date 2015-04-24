
var nsCheckBox = Object.create(HTMLInputElement.Prototype);
/*start of private variables */

/*end of private variables */
/*start of functions */
nsCheckBox.createdCallback = function() 
{
	console.log("In createdCallback");
	this.type = "checkbox";
};

nsCheckBox.attachedCallback = function()
{
	this.initialise();
	console.log("In attachedCallback");
};

nsCheckBox.detachedCallback = function()
{
	console.log("In detachedCallback");
};

nsCheckBox.attributeChangedCallback = function(attrName, oldVal, newVal)
{
	console.log("attrName::" + attrName + " oldVal::" + oldVal + " newVal::" + newVal);
};

nsCheckBox.initialise = function ()
{
	
};

/*end of functions */

//document.registerElement('ns-checkbox', {prototype: nsCheckBox, extends: 'input'});

-------------------------------------------------------------------------------------------------

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


public class FileExtensionChange 
{
	public void listFilesForFolder(String path ,String intendedExtension,String newExtension) throws IOException 
	{
//		File folder = new File(path);
//	    for (final File fileEntry : folder.listFiles()) 
//	    {
//	        if (fileEntry.isDirectory()) 
//	        {
//	            listFilesForFolder(fileEntry.getAbsolutePath(),intendedExtension,newExtension);
//	        } 
//	        else 
//	        {
//	        	modifyFileExtension(fileEntry,intendedExtension,newExtension);
//	            System.out.println(fileEntry.getName());
//	        }
//	    }
	    zipFolder(path,"C:\\Users\\avardhan\\Desktop\\load.js-master\\Test.zip");
	}
	
	private void modifyFileExtension(File file,String intendedExtension,String newExtension) throws IOException 
    {
        int index = file.getName().indexOf(".");
        //print filename
        //System.out.println(file.getName().substring(0, index));
        //print extension
        //System.out.println(file.getName().substring(index));
        String fileName = file.getName().substring(0, index);
        String ext = file.getName().substring(index);
        String extToCompare = "." + intendedExtension;
        //use file.renameTo() to rename the file
        if(extToCompare.equals(ext))
        {
        	Path source  = file.toPath();
        	Files.move(source, source.resolveSibling(fileName + "." + newExtension));

        	//Boolean isSuccess = file.renameTo(new File(fileName + "." + newExtension));
        	//System.out.println("isSuccess " + isSuccess);
        }
    }
	
	private void zipFolder(String sourceFolderPath,String destinationFolderPath) throws IOException
	{
		 ZipOutputStream zip = null;
	     FileOutputStream fW = null;
	     fW = new FileOutputStream(destinationFolderPath);
	     zip = new ZipOutputStream(fW);
	     addFolderToZip("", sourceFolderPath, zip);
	     zip.close();
	     fW.close();
	}
	
	private void addFolderToZip(String path, String srcFolder, ZipOutputStream zip) throws IOException 
	{
        File folder = new File(srcFolder);
        if (folder.list().length == 0) 
        {
            addFileToZip(path , srcFolder, zip, true);
        }
        else 
        {
            for (String fileName : folder.list()) 
            {
                if (path.equals("")) 
                {
                    addFileToZip(folder.getName(), srcFolder + "/" + fileName, zip, false);
                } 
                else 
                {
                     addFileToZip(path + "/" + folder.getName(), srcFolder + "/" + fileName, zip, false);
                }
            }
        }
    }

	
	private void addFileToZip(String path, String srcFile, ZipOutputStream zip, boolean flag) throws IOException 
	{
        File folder = new File(srcFile);
        if (flag) 
        {
            zip.putNextEntry(new ZipEntry(path + "/" +folder.getName() + "/"));
        }
        else 
        {
            if (folder.isDirectory()) 
            {
                addFolderToZip(path, srcFile, zip);
            }
            else 
            {
                byte[] buf = new byte[1024];
                int len;
                FileInputStream in = new FileInputStream(srcFile);
                zip.putNextEntry(new ZipEntry(path + "/" + folder.getName()));
                while ((len = in.read(buf)) > 0) 
                {
                    zip.write(buf, 0, len);
                }
            }
        }
    }

	public static void main(String[] args) throws IOException 
	{
		FileExtensionChange fileExtension = new FileExtensionChange();
		fileExtension.listFilesForFolder("C:\\Users\\avardhan\\Desktop\\load.js-master\\load.js-master","js","txt");
	}

}

