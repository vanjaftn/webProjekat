package services;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;

public class ImportImage {
	
	public void ImportImage(String image, String imagePath) throws FileNotFoundException, IOException {
		
		String part[] = image.split(",");
		String path = "./static/" + imagePath;
		
		byte[] data = Base64.getDecoder().decode(part[1]);
		
		try (OutputStream stream = new FileOutputStream(path)) {
		    stream.write(data);
		}
	}

}
